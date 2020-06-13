import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('point_item').insert([
        { point_id: 1, item_id: 1 },
        { point_id: 1, item_id: 2 },
        { point_id: 1, item_id: 3 },
        { point_id: 2, item_id: 1 },
        { point_id: 2, item_id: 5 },
        { point_id: 2, item_id: 4 },
        { point_id: 3, item_id: 6 },
        { point_id: 4, item_id: 3 },
        { point_id: 5, item_id: 1 },
        { point_id: 6, item_id: 5 },
        { point_id: 7, item_id: 3 },
        { point_id: 7, item_id: 2 },
        { point_id: 8, item_id: 1 },
        { point_id: 9, item_id: 6 },
        { point_id: 10, item_id: 5 },
        { point_id: 11, item_id: 1 },
    ])
}