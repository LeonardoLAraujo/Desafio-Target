export type MovimentStock = {
    id: string,
    entryMoviment: number | null,
    exitMoviment: number | null,
    description: string,
    idProduct: number,
    date: Date | number
}