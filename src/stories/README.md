# Stories

The "stories" module is designed to make for easy access to procedurally generated stories. Stories are a combination of standard templating (pass in a dataset and have the values inserted) and random generation from a dictionary file. This way, no story, even given the same template, is the same.

## Story files

Story files are designed to have all the information necessary to render a procedurally generated tale. The structure of the document is based on [blockdown](https://github.com/saibotsivad/blockdown) with two parseable block types: `story` and `workflow`.

### Story blocks

Story blocks are identified with the name story followed by a unique identifier for this story file.

```
---!story#opener
```

The content of a story block must be plain text. Story blocks make use of [handlebars](https://handlebarsjs.com/guide/) for templating, but with some important features specifically for these stories.

Variables passed in through the data object can be accessed in the normal fashion:

The dataset:

```json
{
  "monster": {
    "name": "Makuta"
  }
}
```

The story block:

```handlebars
---!story#opener

Then {{monster.name}} thrust its mighty spear...
```

The compiled result:

```markdown
Then Makuta thrust its mighty spear...
```

In addition to variables, dictionary values may be accessed. The dictionary operates at the scope defined in the [workflow](#workflow-blocks) hash for this story and is accessed at the `$` variable. Dictionary values are very special, however. The dictionary key itself actually refers to a list of potential values. When accessed by the Handlebars compiler, the story engine will pick one of those values at random.

The scoped dictionary passed to the story:

```json
{
  "monster": {
    "smells": ["foul", "rank", "putrid", "like gangrene"]
  }
}
```

The story block:

```handlebars
---!story#prison

The boxy room smelled {{$.monster.smells}}
```

The compiled result:

```markdown
The boxy room smell putrid
```

#### Helpers

A number of helper functions are provided by the story engine for ease of templating.

###### series

Takes a list of maps and a path to a value and serializes them with a random joiner (`and`, `along with`, `together with`). This helper inserts an Oxford comma, as is right and proper.

```
series list key
```

- `list`: A list of maps
- `key`: A string dot-prop path to the value in the map which will be serialized

```json
{
  "inventory": [{ "itemName": "pick axe" }, { "itemName": "lantern" }, { "itemName": "oil" }]
}
```

```handlebars
He grabbed his things, his {{series inventory "itemName"}}, and walked home.
```

```markdown
He grabbed his things, pick axe, lantern, together with oil, and walked home.
```

##### godOrGoddess

Given a gender, will return `god` or `goddess`.

**Note**: both non-binary and hermaphrodite presently return as `god`. This is done not to infer gender, but as `god` is widely accepted as the generic for deity of the two. (**Further Note**: I am quite happy to debate this matter and more than happy to take alternative suggestions).

```
godOrGoddess gender
```

- `gender`: One of `male`, `female`, `non-binary`, or `hermaphrodite`

##### possessive

```
possessive word
```

Given a word, either a `'` or a `'s` will be appended to the word according to the rules of style.

##### capitalize

```
capitalize word
```

Given a word, capitalize the first letter.

### Workflow Blocks

Workflow blocks should exist only once per story file (though the compiler will not break if more than one is provided). These blocks are simply yaml documents with a top-level member of `story`.

`story` is a list with keyed members whose keys accord with the `id`s of the above story blocks.

```yaml
story:
  - opener
  - prison
```

The list is compiled in the order assigned in the workflow.

Each list item may be a hash with the following members:

- `dictionary_scope` - A `string` dot-prop path from the root of the dictionary expressing at what level the story dictionary should be scoped for this story block. Defaults to root.
- `add_pronouns` - A list of `strings` referring to keys in the dataset which should have a pronouns object added. This can be applied to both Arrays and objects. If a gender key is found at the root of the Object or the root of each Object, pronouns will be based upon that gender (non-binary and hermaphrodite both use `they/them`). If a gender key is not found, inanimacy/non-sentience is assumed, and neuter pronouns are applied.
- `external` - If `true`, the compiler will look for a previous rendered story in the external dataset with a key matching the id of this list.
- `condition` - A list of simple conditions which have access to all the parameters in the dataset. Note that these conditions will pull the value from the dataset for left side of the equation and then compiles the statement with the value replaced for the left side. For this reason, these statements should endeavor to be boolean statements with the more complex matters handled at the point of passing in data to the dataset. Conditions which do not pass have their job ignored and are not included in the compiled story.

### Variable Comments

While not regarded for purposes of compilation, it is nevertheless important to include a typed list of inputs for a given story. Ideally these would be added as the story is written as a means of keeping track. This is a helpful documentation tool.

**Format**

Variable comments must be the first line of a story file if included and look similar to jsdoc comments:

```js
/** Variables
 * - monster: Monster
 */
```

Note that the first line must be `/** Variables` and the concluding line end in a `*/` or else it will not be removed prior to compilation and could break the compilation process.
