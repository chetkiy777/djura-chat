export class Tree {

    constructor(treeArr = []){
        this.treeArr = treeArr
    }

    addItem(item) {
        if (!this.treeArr.length) {
            this.treeArr.push({
                name: item.name,
                isRoot: true,
                parentId: null,
                children: []
            })
        }
    }

    addChild(item){
        
    }
}