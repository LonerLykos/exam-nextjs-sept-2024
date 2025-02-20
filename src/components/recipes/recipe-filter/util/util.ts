export const taskProcessor = (item: string) => {
    if (!item) return {type: '', tags: []}
    const split = item.split('/');
    const type = split[1];
    const tags = split[2].split('=');

    return {type, tags}

}