const users = [
  {
    id: '1bca2de9-0e77-5b6e-8045-8955ce18dae1',
    username: 'ray',
    password: 'ray1234!',
    nickname: 'Sylvia Ray',
  },
  {
    id: '4d4f0d3e-5c06-5218-871b-98de7115c80c',
    username: 'harmon',
    password: 'harmon1234!',
    nickname: 'Lloyd Harmon',
  },
  {
    id: '360e15fc-447d-508b-a0e0-e42b50dd4189',
    username: 'clara',
    password: 'clara1234!',
    nickname: 'Clara Herrera',
  },
  {
    id: '25d7ece7-cb5d-5ee3-8d5f-d78e0c868c7b',
    username: 'ramsey',
    password: 'ramsey1234!',
    nickname: 'Julia Ramsey',
  },
]

export class User {
  id!: string
  username!: string
  password!: string
  nickname!: string

  static findOne(args: { where: { id?: string, username?: string }}) {
    let user: typeof users[number] | undefined = undefined

    if (args.where.id) {
      user = users.find((user) => user.id === args.where.id)
    } else if (args.where.username) {
      user = users.find((user) => user.username === args.where.username)
    }

    if (!user) {
      return null
    }

    const _user = new User()
    _user.id = user.id
    _user.username = user.username
    _user.password = user.password
    _user.nickname = user.nickname

    return _user
  }
}
