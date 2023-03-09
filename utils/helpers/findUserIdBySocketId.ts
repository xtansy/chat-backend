export const getUserIdsArrBySocketId = (map: Map<string, string>, socketId: string) => {
    return [...map.entries()]
        .filter(({ 1: v }) => v === socketId)
        .map(([k]) => k);
}