export interface ParsedName {
    camelName: string,
    capName: string
}

export default function parseName(name: string): ParsedName {
    let camelName: string = name.replace(/([A-Z])/g, '-$1').toLowerCase();

    if (camelName.charAt(0) === '-') {
        camelName = camelName.substring(1);
    }

    camelName = camelName.replace(/--/g, '-');

    let capName: string = name.charAt(0).toUpperCase() + name.slice(1);

    if (capName.indexOf('-') !== -1) {
        let index: number = -1;

        while ((index = capName.indexOf('-')) !== -1) {
            if (index + 1 === capName.length) {
                capName = capName.substring(0, capName.length - 1);
            } else {
                capName = capName.substring(0, index) + capName.substring(index + 1, index + 2).toUpperCase() + capName.substring(index + 2)
            }
        }
    }

    return {
        camelName,
        capName
    }
}