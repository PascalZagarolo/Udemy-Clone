

let commentFilter  = "newest";


export const changeCommentFilter = (newFilter : string) => {
    commentFilter = newFilter;
}

export const getCommentFilter = () => {
    return commentFilter;
}