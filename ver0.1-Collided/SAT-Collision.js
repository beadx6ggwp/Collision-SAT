// SAT-Collision.js
function SAT_Collision(polygonA, polygonB) {
    // Get the normal vector on the edge of the polygon(left norm), return Array
    let normal_polygonA = polygonA.getNorm(),
        normal_polygonB = polygonB.getNorm();
    // Get the vertex array of polygons, return Array
    let vertices_polygonA = polygonA.getVertices(),
        vertices_polygonB = polygonB.getVertices();

    let Collided = true;

    // use polygonA normals to evaluate
    for (let i = 0; i < normal_polygonA.length; i++) {
        let minMax_A = getMinMax(vertices_polygonA, normal_polygonA[i]),
            minMax_B = getMinMax(vertices_polygonB, normal_polygonA[i]);

        Collided = (minMax_B.min < minMax_A.max && minMax_A.min < minMax_B.max);

        if (!Collided) break;
    }

    if (Collided) {
        // use polygonB normals to evaluate
        for (let i = 0; i < normal_polygonB.length; i++) {
            let minMax_A = getMinMax(vertices_polygonA, normal_polygonB[i]),
                minMax_B = getMinMax(vertices_polygonB, normal_polygonB[i]);

            Collided = (minMax_B.min < minMax_A.max && minMax_A.min < minMax_B.max);

            if (!Collided) break;
        }
    }

    return Collided;// true:Collided, false:Separated
}

function getMinMax(vertices, axis) {
    let min_DotProduct = vertices[0].dot(axis),
        max_DotProduct = vertices[0].dot(axis);
    let min_index = 0, max_index = 0;

    for (let i = 1; i < vertices.length; i++) {
        let temp = vertices[i].dot(axis);

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