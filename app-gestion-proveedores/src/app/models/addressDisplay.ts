export interface AddressDisplay {
    street: string,
    number: string,
    postal_code: string,
    locality: {
        id: number, 
        name: string, 
        province: {id: number, 
            name: string, 
            country: {id: number, 
                name: string}
            },
    }
}