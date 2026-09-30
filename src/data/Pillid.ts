
/**
 * @var
 *
 * A simple incrementing counter used to tag a newly-spawned pill's two
 * halves with a shared id (see data/Cellids.ts), so the falling logic
 * can tell that two adjacent cells belong to the same pill rather than
 * two separate ones.
 */

let idn = 1

function setIdn() {
    return idn++;
}

let obj = {
    idn: idn,
    setIdn: setIdn
}

export default obj