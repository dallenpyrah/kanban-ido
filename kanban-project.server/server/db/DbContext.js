import mongoose from 'mongoose'
import ListSchema from '../models/List'
import BoardSchema from '../models/Board'
import TaskSchema from '../models/Task'
import CommentSchema from '../models/Comment'
import AccountSchema from '../models/Account'

class DbContext {
  Board = mongoose.model('Board', BoardSchema);
  List = mongoose.model('List', ListSchema);
  Task = mongoose.model('Task', TaskSchema);
  Comment = mongoose.model('Comment', CommentSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
