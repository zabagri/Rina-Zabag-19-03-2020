var Store =  {
    Save(key, value) {
        var key = key + "(favorite)"
        localStorage.setItem(key, value);
    },
    Get(key) {
        var key = key + "(favorite)"
        return localStorage.getItem(key);
    },
    Remove(key) {
        var key = key + "(favorite)"
        localStorage.removeItem(key);
    },
    GetAll() {
        var favorites = [];
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if(key.includes("(favorite)") !== false)
            {
                key = key.split("(favorite)")[0];
                favorites.push({key, name: Store.Get(key)});
            }
        }
        return favorites;
    }
};

export default Store;