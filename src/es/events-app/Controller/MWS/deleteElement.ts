export class deleteElement {

    static element(document: any, element: any) {
        delete document[element]
        return document;
    }
   
}

