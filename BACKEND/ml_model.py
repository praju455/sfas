def predict_yield(crop, soil, season, location):
    score = 50  # base

    # crop weight
    if crop == "Ragi":
        score += 20
    elif crop == "Wheat":
        score += 15
    elif crop == "Rice":
        score += 10

    # soil weight
    if soil == "Loamy":
        score += 15
    elif soil == "Clay":
        score += 10
    elif soil == "Sandy":
        score += 5

    # season weight
    if season == "Rabi":
        score += 10
    elif season == "Kharif":
        score += 5

    # location boost
    if location == "Karnataka" and crop == "Ragi":
        score += 20
    if location == "Punjab" and crop == "Wheat":
        score += 20

    return min(score, 100)
