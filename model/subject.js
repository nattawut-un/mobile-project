export class Subject {
  /**
   * Subject
   *
   * @param {String} id Subject ID
   * @param {String} title Subject title
   * @param {String} description Subject description
   * @param {Date} createDate Subject create date
   */
  constructor(id, title, description, createDate) {
    this.id = id
    this.title = title
    this.description = description
    this.createDate = createDate
  }
}
