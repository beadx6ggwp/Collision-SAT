// SAT-Collision.js
function SAT_Collision(polygonA, polygonB) {
    // Get the normal vector on the edge of the polygon(left norm), return Array
    let normal_polygonA = polygonA.getNorm(),
        normal_polygonB = polygonB.getNorm();
    // Get the vertex array of polygons, return Array
    let vertices_polygonA = polygonA.getVertices(),
        vertices_polygonB = polygonB.getVertices();

    let isSeparated = false;

    // use polygonA normals to evaluate
    for (let i = 0; i < normal_polygonA.length; i++) {
        let minMax_A = getMinMax(polygonA.getVertices(), normal_polygonA[i]),
            minMax_B = getMinMax(polygonB.getVertices(), normal_polygonA[i]);

        isSeparated = (minMax_B.min > minMax_A.max || minMax_A.min > minMax_B.max);
        if (isSeparated) break;
    }

    if (!isSeparated) {
        // use polygonB normals to evaluate
        for (let i = 0; i < normal_polygonB.length; i++) {
            let minMax_A = getMinMax(polygonA.getVertices(), normal_polygonA[i]),
                minMax_B = getMinMax(polygonB.getVertices(), normal_polygonA[i]);

            isSeparated = (minMax_B.min > minMax_A.max || minMax_A.min > minMax_B.max);

            if (isSeparated) break;
        }
    }

    return isSeparated;// true:Separated boxes, false:Collided boxes
}

function getMinMax(vertices, axis) {
    let min_DotProduct = vertices[0].projectOnto(axis).length(),
        max_DotProduct = vertices[0].projectOnto(axis).length();
    let min_index = 0, max_index = 0;

    for (let i = 1; i < vertices.length; i++) {
        let temp = vertices[i].projectOnto(axis).length();

        if (temp < min_DotProduct) {
            min_DotProduct = temp;
            min_index = i;
        }

        if (temp > max_DotProduct) {
            max_DotProduct = temp;
            max_index = i;
        }
    }
    let result = {
        min: min_DotProduct,
        max: max_DotProduct,
        minPoint: vertices[min_index],
        maxPoint: vertices[max_index]
    };
    return result;
}