# Node interface example

### Sample Query
**Run GraphQL Playground with the `Show` button at the top**

```
# person id: UGVyc29uOjEyMzQ=
# article: QXJ0aWNsZTo1Njc4

{
  node(id:"QXJ0aWNsZTo1Njc4"){
    id
    __typename
    ...on Person {
      name
    }
    
    ...on Article {
      title
    }
  }
}
```