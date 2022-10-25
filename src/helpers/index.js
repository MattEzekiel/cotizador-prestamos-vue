const calcularTotalPagar = (cantidad, plazo) => {
    let total = 0;

    // Mientras mayor es la cantidad, menor es el interés
    switch (true) {
        case cantidad < 5000:
            total = cantidad * 1.5;
            break;
        case cantidad > 5000 && cantidad < 10000:
            total = cantidad * 1.4;
            break;
        case cantidad >= 10000 && cantidad <= 15000:
            total = cantidad * 1.3;
            break;
        default:
            total = cantidad * 1.2;
            break;
    }

    // Plazo: Cuanto mayor plazo mayor interés
    switch (true) {
        case plazo === 6:
            total *= 1.1;
            break;
        case plazo === 12:
            total *= 1.2;
            break;
        // case plazo === 24:
        default:
            total *= 1.3;
            break;
    }

    return total;
}

export {
    calcularTotalPagar
}