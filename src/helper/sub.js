import lodash from 'lodash'

export default (subs) => {
    return (name, ...more) => {
        const subFn = lodash.find(subs, (fn, key) => (key === name));

        if (subFn) {
            return subFn.apply(null, more);
        }

        return null;
    }
}
