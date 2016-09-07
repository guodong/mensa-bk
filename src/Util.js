var gid = 1;
var zindex = 10;
export default {
  generateId() {
    return gid++;
  },
  
  generateZindex() {
    return zindex++;
  }
}
