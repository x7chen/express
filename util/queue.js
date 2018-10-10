var Queue = function() {
    this.dataStore = [];
};
Queue.prototype = {
    constructor:Queue,
    //向队末尾添加一个元素
    enqueue:function(element) {
        this.dataStore.push(element)
    },

    //删除队首的元素
    dequeue:function() {
        return this.dataStore.shift();
    },

    front:function () { //读取队首和队末的元素
        return this.dataStore[0];
    },

    back:function() { ////读取队首和队末的元素
        return this.dataStore[this.dataStore.length - 1]
    },
    all:function(){
		return this.dataStore;
	},
    count:function(){
        return this.dataStore.length;
    },
    
    //队列是否为空
    empty:function() {
        if (this.dataStore.length == 0) {
            return true;
        } else {
            return false;
        }
    }
};
//必须要module
module.exports = Queue;