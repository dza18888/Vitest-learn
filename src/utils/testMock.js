const testMock = {
  testViMockDefault() {
    return {
      viMock: "test1",
    };
  },
  addNewProduct(productInfo) {
    return new Promise((resolve, reject) => {
      if (productInfo && productInfo.price) {
        resolve("Add success");
      } else {
        reject("No product price");
      }
    });
  },
};

export default testMock;
