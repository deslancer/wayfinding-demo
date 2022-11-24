export interface IPriorityQueue {
    collection: Array<number>;

    enqueue(element: Array<number>): void;

    dequeue(): Array<number>

    isEmpty(): boolean
}

export class PriorityQueue implements IPriorityQueue {
    collection: Array<any> = [];

    dequeue(): Array<any> {
        return this.collection.shift();
    }

    enqueue(element: Array<any>): void {
        if (this.isEmpty()) {
            this.collection.push(element);
        } else {
            let added = false;
            for (let i = 1; i <= this.collection.length; i++) {
                if (element[1] < this.collection[i - 1][1]) {
                    this.collection.splice(i - 1, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.collection.push(element);
            }
        }
    }

    isEmpty(): boolean {
        return (this.collection.length === 0)
    }

}