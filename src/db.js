const fs = require('node:fs');
const path = require('node:path');
const loki = require('lokijs');

const LokiFSStructuredAdapter = require('lokijs/src/loki-fs-structured-adapter');

const db_folder = path.resolve(__dirname, '..', 'db');
// ensure cards folder exists
if (!fs.existsSync(db_folder)) {
    fs.mkdirSync(db_folder);
}

class DB {
    constructor() {}

    init = (callback) => {
        this.db = new loki(path.resolve(db_folder, 'users.db'), {
            autosave: true,
            autoload: true,
            adapter: new LokiFSStructuredAdapter(),
            autoloadCallback: () => {
                let entries = this.db.getCollection('users');
                if (entries === null) {
                    entries = this.db.addCollection('users', { indices: ['discord_id'] });
                }
                this.collection = entries;
                console.log('test');
                callback();                
            }
        });
    };

    addUser = (discord_id, roblox_name) => {
        const user = this.collection.findOne({ discord_id });

        if (!user) {
            this.collection.insert({
                discord_id,
                roblox_name
            });
        }
    };

    updateUser = (discord_id, roblox_name) => {
        const user = this.collection.findOne({ discord_id });

        if (!user) {
            this.addUser(discord_id, roblox_name);
            return;
        }
        
        this.collection.findAndUpdate({ discord_id }, (entry) => {
            entry.roblox_name = roblox_name;
        });
    };

    getUsers = () => {
        return this.collection.chain().simplesort("roblox_name").data();
    };

}

module.exports = new DB();
