export interface UnitSchema{
    id: string;
    base_stat: Record<string, number>;
    growth_stat: Record<string, number>;
    created_at: string;
}

export type CreateUnitInput = Omit<UnitSchema, 'created_at'>;