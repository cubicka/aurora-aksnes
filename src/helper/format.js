export function FormatHarga(x) {
    if (!x) {
        return 0;
    }

    return x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
