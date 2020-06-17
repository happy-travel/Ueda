module.exports = function (api) {
    api.cache(true);
    const presets = [
        "react-app"
    ];
    const plugins= [
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ],
        [
            "@babel/plugin-proposal-optional-chaining"
        ],
        [
            "@babel/plugin-proposal-optional-catch-binding"
        ]
    ];
    return {
        presets,
        plugins
    }
};
