function knex() {
    return {
        insert: () => { return },
        commit: () => { return },
        from: () => { return },
        transaction: () => { return },
        select: () => { return },
        rollback: () => { return },
        where: () => { return },
        first: () => { return },
        join: () => { return }
    }
}
export default knex()