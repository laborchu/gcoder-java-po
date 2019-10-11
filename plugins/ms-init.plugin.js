'use strict';
let path = require('path');
var gcoder = require('gcoder');
var template = require('es6-template-string');

var MsInitPlugin = module.exports = gcoder.Plugin.extend({
    constructor: function () {
    }
});

MsInitPlugin.prototype.do = function (tables,config) {
    MsInitPlugin.__super__.do();
    let rootFolder = process.cwd();
    let gcoderFolder = path.join(__dirname, "../../");
    let gcoderPath = path.join(gcoderFolder, config.gcoder);
    let msPath = path.join(gcoderPath, "ms");

	let distPath = path.join(rootFolder, "modules", "module-base", "module-po");
    MsInitPlugin.__super__.createFolder(distPath);

    let basePackagePath = path.join(distPath,"src/main/java",config.java.package.po.replace(/\./g,'/'));
    MsInitPlugin.__super__.createFolder(basePackagePath);
    let basePath = path.join(msPath, "po",'BasePO.java');
    let baseDistPath = path.join(basePackagePath, 'BasePO.java');
    MsInitPlugin.__super__.writeFileSync(basePath,baseDistPath,{
        config:config
    });
    let modulePomPath = path.join(msPath, "pom",'module-pom.xml');
    let modulePomDistPath = path.join(baseModulePath, 'pom.xml');
    MsInitPlugin.__super__.writeFileSync(modulePomPath,modulePomDistPath,{
        config:config
    });
    
    for(let table of tables){
        if(table.prefix=='qrtz'){
            continue;
        }

        let modulePackagePath = path.join(distPath,"src/main/java",config.java.package.vo.replace(/\./g,'/'),table.prefix);
        let poTemplatePath = path.join(msPath, "po",'${upperCamelName}PO.java');
        let poDistPath = path.join(modulePackagePath, table.upperCamelName+'PO.java');
        MsInitPlugin.__super__.writeFileSync(poTemplatePath,poDistPath,{
            table: table,
			config: config
        });

        let xmlTemplatePath = path.join(msPath, "mybatis",'${upperCamelName}.xml');
        let xmlDistPath = path.join(xmlPackagePath, table.upperCamelName+'.xml');
        MsInitPlugin.__super__.writeFileSync(xmlTemplatePath,xmlDistPath,{
            table: table,
			config: config
        });
    }
};
