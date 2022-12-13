export const updateObjectInArray = (items, itemId, opjPropName, newObjectProps) => {
    return items.map(u => {
        if (u[opjPropName] === itemId) {
            return {...u, ...newObjectProps};
        }
        return u;
    })
}
