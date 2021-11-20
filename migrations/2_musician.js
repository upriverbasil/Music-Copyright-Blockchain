const Migrations = artifacts.require("Musicians");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
