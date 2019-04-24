interface TagModel {
    tagId: number;
    label: string;
}

function isTagModel(tag: TagModel | string): tag is TagModel {
    return (<TagModel>tag).tagId !== undefined;
}

export default TagModel;

export { isTagModel }