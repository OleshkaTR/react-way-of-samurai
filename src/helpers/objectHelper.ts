export const updateObjectInArray = (items: any, itemId: any, opjPropName: any, newObjectProps: any) => {
    return items.map((u: any) => {
        if (u[opjPropName] === itemId) {
            return {...u, ...newObjectProps};
        }
        return u;
    })
}
