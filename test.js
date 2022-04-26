function rotate(matrix) {
  let n = matrix[0].length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < 2; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }
  return matrix;
}

console.log(
  rotate([
    [5, 1, 6],
    [4, 0, 2],
    [7, 3, 8],
  ])
);
