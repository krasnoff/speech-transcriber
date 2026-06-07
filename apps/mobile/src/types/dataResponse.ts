export type DataResponse = {
    overallSummary: string,
    mainInsights: string,
    toDoList: {
        teamMemberName: string,
        todo: {
            item: string,
        }[]

    }[],
}