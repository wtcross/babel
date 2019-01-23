//@flow

import builtInsList from "../data/built-ins.json";
import builtInsWebList from "../data/built-ins-web.json";
import { logPlugin } from "./debug";
import {
  getPlatformSpecificDefaultFor,
  getOptionSpecificExcludesFor,
} from "./defaults";
import { filterItems } from "./env-filter";
import moduleTransformations from "./module-transformations";
import normalizeOptions from "./normalize-options.js";
import pluginList from "../data/plugins.json";
import {
  builtIns as proposalBuiltIns,
  features as proposalPlugins,
  pluginSyntaxMap,
} from "../data/shipped-proposals.js";
import addCoreJS3EntryPlugin from "./polyfills/corejs3/entry-plugin";
import addCoreJS3UsagePlugin from "./polyfills/corejs3/usage-plugin";
import addRegeneratorUsagePlugin from "./polyfills/regenerator/usage-plugin";
import getTargets from "./targets-parser";
import availablePlugins from "./available-plugins";
import { filterStageFromList, prettifyTargets } from "./utils";
import { declare } from "@babel/helper-plugin-utils";

const allBuiltInsList = Object.assign(builtInsList, builtInsWebList);

const getPlugin = (pluginName: string) => {
  const plugin = availablePlugins[pluginName];

  if (!plugin) {
    throw new Error(
      `Could not find plugin "${pluginName}". Ensure there is an entry in ./available-plugins.js for it.`,
    );
  }

  return plugin;
};

const builtInsListWithoutProposals = filterStageFromList(
  allBuiltInsList,
  proposalBuiltIns,
);

const pluginListWithoutProposals = filterStageFromList(
  pluginList,
  proposalPlugins,
);

const getBuiltInTargets = targets => {
  const builtInTargets = {
    ...targets,
  };
  if (builtInTargets.uglify != null) {
    delete builtInTargets.uglify;
  }
  return builtInTargets;
};

export const transformIncludesAndExcludes = (opts: Array<string>): Object => {
  return opts.reduce(
    (result, opt) => {
      const target = opt.match(/^(es|esnext|web)\./) ? "builtIns" : "plugins";
      result[target].add(opt);
      return result;
    },
    {
      all: opts,
      plugins: new Set(),
      builtIns: new Set(),
    },
  );
};

function supportsStaticESM(caller) {
  return !!(caller && caller.supportsStaticESM);
}

export default declare((api, opts) => {
  api.assertVersion(7);

  const {
    configPath,
    debug,
    exclude: optionsExclude,
    forceAllTransforms,
    ignoreBrowserslistConfig,
    include: optionsInclude,
    loose,
    modules,
    shippedProposals,
    spec,
    targets: optionsTargets,
    useBuiltIns,
  } = normalizeOptions(opts);
  // TODO: remove this in next major
  let hasUglifyTarget = false;

  if (optionsTargets && optionsTargets.uglify) {
    hasUglifyTarget = true;
    delete optionsTargets.uglify;

    console.log("");
    console.log("The uglify target has been deprecated. Set the top level");
    console.log("option `forceAllTransforms: true` instead.");
    console.log("");
  }

  if (optionsTargets && optionsTargets.esmodules && optionsTargets.browsers) {
    console.log("");
    console.log(
      "@babel/preset-env: esmodules and browsers targets have been specified together.",
    );
    console.log(
      `\`browsers\` target, \`${optionsTargets.browsers}\` will be ignored.`,
    );
    console.log("");
  }

  const targets = getTargets(optionsTargets, {
    ignoreBrowserslistConfig,
    configPath,
  });
  const include = transformIncludesAndExcludes(optionsInclude);
  const exclude = transformIncludesAndExcludes(optionsExclude);

  const transformTargets = forceAllTransforms || hasUglifyTarget ? {} : targets;

  const transformations = filterItems(
    shippedProposals ? pluginList : pluginListWithoutProposals,
    include.plugins,
    exclude.plugins,
    transformTargets,
    null,
    getOptionSpecificExcludesFor({ loose }),
    pluginSyntaxMap,
  );

  let polyfills;
  let polyfillTargets;

  if (useBuiltIns) {
    polyfillTargets = getBuiltInTargets(targets);

    polyfills = filterItems(
      shippedProposals ? allBuiltInsList : builtInsListWithoutProposals,
      include.builtIns,
      exclude.builtIns,
      polyfillTargets,
      getPlatformSpecificDefaultFor(polyfillTargets),
      null,
    );
  }

  const plugins = [];
  const pluginUseBuiltIns = useBuiltIns !== false;

  if (
    modules !== false &&
    moduleTransformations[modules] &&
    // TODO: Remove the 'api.caller' check eventually. Just here to prevent
    // unnecessary breakage in the short term for users on older betas/RCs.
    (modules !== "auto" || !api.caller || !api.caller(supportsStaticESM))
  ) {
    // NOTE: not giving spec here yet to avoid compatibility issues when
    // transform-modules-commonjs gets its spec mode
    plugins.push([getPlugin(moduleTransformations[modules]), { loose }]);
  }

  transformations.forEach(pluginName =>
    plugins.push([
      getPlugin(pluginName),
      { spec, loose, useBuiltIns: pluginUseBuiltIns },
    ]),
  );

  const regenerator = transformations.has("transform-regenerator");

  if (debug) {
    console.log("@babel/preset-env: `DEBUG` option");
    console.log("\nUsing targets:");
    console.log(JSON.stringify(prettifyTargets(targets), null, 2));
    console.log(`\nUsing modules transform: ${modules.toString()}`);
    console.log("\nUsing plugins:");
    transformations.forEach(transform => {
      logPlugin(transform, targets, pluginList);
    });

    if (!useBuiltIns) {
      console.log(
        "\nUsing polyfills: No polyfills were added, since the `useBuiltIns` option was not set.",
      );
    } else {
      console.log(
        `
Using polyfills with \`${useBuiltIns}\` option:`,
      );
    }
  }

  if (useBuiltIns === "usage" || useBuiltIns === "entry") {
    const pluginOptions = {
      debug,
      polyfills,
      regenerator,
      onDebug: (polyfills, context) => {
        polyfills.forEach(polyfill =>
          logPlugin(polyfill, polyfillTargets, allBuiltInsList, context),
        );
      },
    };

    if (useBuiltIns === "usage") {
      plugins.push([addCoreJS3UsagePlugin, pluginOptions]);
      plugins.push([addRegeneratorUsagePlugin, pluginOptions]);
    } else {
      plugins.push([addCoreJS3EntryPlugin, pluginOptions]);
    }
  }

  return {
    plugins,
  };
});
