import Knex from "knex";

function knex(knexConfig: Knex.Config) {
    return {
        insert: () => { return },
        commit: () => { return },
        from: () => { return },
        transaction: () => { return  },
        select: () => { return },
        rollback: () => { return }
    }
}
export default knex