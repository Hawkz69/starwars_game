// Palleta de cores globais para serem usadas na aplicação
// TODO: Usar esta palleta SEPARADA ao longo do projeto
export const Colors = {
    primary:         "rgb(18, 108, 115)",
    secondary:       "rgb(87, 224, 191)",
    third:           "rgb(87, 214, 224)",
    greenOk:         "rgb(41, 179, 57)",
    fourth:          "rgb(0, 178, 151)",
    white:           "rgb(255, 255, 255)",
    red:             "rgb(236, 0, 0)",
    transparent:     "rgba(0, 178, 151, 0)",
    green:           "rgb(33, 178, 78)",
    mediumGreen:     "rgb(0,178,151)",
    lightGreen:      "rgb(1, 176, 149)",
    lightGreen2:     "rgb(158, 219, 178)",
    lightGray:       "rgba(0, 0, 0, 0.15)",
    darkBlue:        "rgb(0,48,59)",
    attrBorderWhite: {borderColor: "rgb(255,255,255)"},
    attrWhite:       {color: "rgb(255,255,255)"},
    attrMediumGreen: {color: "rgb(0,178,151)"},
};

export const iconsToolbar = {
    iconHeight : "24",
    iconWidht : "24",
    color : "white",
};

export const iconsMenu = {
    iconHeight : "30",
    iconWidht : "30",
    color : Colors.secondary,
};

export const placeholders = {
    // placeholderProfile : require('../img/profile-img-large.png'),
    // placeholderCover : require('../img/cover-img-large.png')
    logo: require('../img/logo.png'),
    // logoBranco: require('../img/logo_branco.png')
}

export default Colors