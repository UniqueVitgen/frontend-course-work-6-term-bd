

export class ArrayWorker {

    containts(array: any[], object) {
        return array.indexOf(object) != -1;
    }

    copy(array: any[]) {
        return array.slice();
    }

    containtsByProperty(array: any[], object, prop) {
        return array.filter((element) => {
            return element[prop] === object[prop];
        }).length > 0;
    }

    getAllByProperty(array: any[], object, prop) {
        const resArray = array.filter((element) => {
            return element[prop] === object[prop];
        });
        console.log(resArray);
        return resArray;
    }

    indexOfByProperty(array: any[], object, prop) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][prop] === object[prop]) {
                return i;
            }
        }
        return -1;
    }
}