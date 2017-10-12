// SAT-Collision.js
function SAT_Collision(polygonA, polygonB) {
    // Get the normal vector on the edge of the polygon(left norm), return Array
    let normal_polygonA = polygonA.getNorm(),
        normal_polygonB = polygonB.getNorm();
    // Get the vertex array of polygons, return Array
    let vertices_polygonA = polygonA.getVertices(),
        vertices_polygonB = polygonB.getVertices();

    let isCollision = false;

    // use polygonA normals to evaluate
    for (let i = 0; i < normal_polygonA.length; i++) {
        let minMax_A = getMinMax(vertices_polygonA, normal_polygonA[i]),
            minMax_B = getMinMax(vertices_polygonB, normal_polygonA[i]);

        isCollision = (minMax_B.min < minMax_A.max || minMax_A.min < minMax_B.max);

        if (!isCollision) break;
    }

    if (isCollision) {
        // use polygonB normals to evaluate
        for (let i = 0; i < normal_polygonB.length; i++) {
            let minMax_A = getMinMax(vertices_polygonA, normal_polygonB[i]),
                minMax_B = getMinMax(vertices_polygonB, normal_polygonB[i]);

            isCollision = (minMax_B.min < minMax_A.max || minMax_A.min < minMax_B.max);

            if (!isCollision) break;
        }
    }

    return isCollision;// true: Collided, false: Separated
}

function getMinMax(vertices, axis){

}