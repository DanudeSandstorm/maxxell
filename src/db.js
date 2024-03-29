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
    static instance = null;

    constructor() {
        if (DB.instance) {
            return DB.instance;
        }
        DB.instance = this;
    }

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
                console.log('Database loaded');
                callback();                
            }
        });
    };

    close = () => {
        this.db.close();
    };

    /**
     * @returns {{discord_id: string, roblox_name: string, $loki: number}}
     */
    getUser = (discord_id) => {
        return this.collection.findOne({ discord_id });
    };

    addUser = (discord_id, roblox_name) => {
        this.collection.insert({
            discord_id,
            roblox_name
        });
    };

    updateUser = (discord_id, roblox_name) => {
        const user = this.getUser(discord_id);

        if (!user) {
            this.addUser(discord_id, roblox_name);
            return;
        }
        
        this.collection.findAndUpdate({ discord_id }, (entry) => {
            entry.roblox_name = roblox_name;
        });
    };

    /**
     * @returns {Array<{discord_id: string, roblox_name: string, $loki: number}>}
     */
    getUsers = () => {
        return this.collection.chain().simplesort("roblox_name").data();
    };

    removeUsers = (discord_ids) => {
        this.collection.findAndRemove({ discord_id: { $in: discord_ids } });
    };
}

module.exports = new DB();
