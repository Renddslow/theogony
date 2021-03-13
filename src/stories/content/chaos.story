/** Variables
  * - monster: Monster
  * - participants: Deity[]
  * - allGods: boolean
  * - rounds: number
  * - monsterDead: boolean
  * - slayer: Deity
  */

---!story#opener

Out of the {{$.monster.emerge_from}}, {{monster.name}} emerged. A {{$.monster.adjective}} {{monster.type}}, {{monster.pronouns.subject}} {{$.monster.evil_act}}. {{capitalize monster.pronouns.possessive}} {{$.monster.evil_descriptor}} was great, and it broke the souls of the newly formed gods. But {{monster.pronouns.possessive}} reign was not to last.


---!story#war_start

{{#if (gt participants.length 1)}}
{{series participants "name" }} banded together, {{#if allGods}}a cohort of all the gods of the cosmos, working in one accord.{{else}}a rebel party, rising up to do what the rest could not.{{/if}} Together they engaged the {{monster.type}} in pitched battle, seeking once and for all to cast down {{monster.pronouns.possessive}} {{$.monster.supremacy}}.
{{else}}
Only one had the courage to stand against the {{$.monster.reign_descriptor}} of {{monster.name}}. {{participant.0.name}}, {{godOrGoddess participants.0.gender}} of {{participants.0.archetype}}, confronted the {{monster.type}} in pitched battle.
{{/if}}

---!story#war_length

{{#if (lt rounds 2)}}
Though {{monster.name}} was fierce, the fighting ended swiftly. For {{#if (gt rounds 1)}}only a few days{{else}}merely a single day{{/if}} the {{#if (gt participants.length 1)}}gods{{else}}{{godOrGoddess participants.0.gender}}{{/if}} battled the fell {{monster.type}}.
{{/if}}

{{#if (between rounds 2 7)}}
{{monster.name}} was fierce, battling not just for supremacy, but for {{monster.pronouns.possessive}} life. The battle lasted many weeks, each side growing weary and suffering serious casualties. Yet the {{#if (gt rounds 1)}}gods{{else}}{{godOrGoddess participants.0.gender}}{{/if}} battled on, it was {{monster.name}} or them.
{{/if}}

{{#if (between rounds 8 15)}}
For years the gods did battle against {{monster.name}}. Though the power of the gods was great, they were sorely out-matched by a chaos fiend. Nevertheless, the battle raged, caring little for time or comfort.
{{/if}}

{{#if (gt rounds 15)}}
For ages on end the gods did war against the {{monster.type}}. {{monster.name}} was fierce, the battle tipped many times in {{monster.pronouns.possessive}} favor. But then for another few centuries, the battle would tip in favor of the gods. They resisted with everything they had, sustaining losses and sacrificing friendships. Yet what is an eternity to a god?
{{/if}}

---!story#ending_defeat

The war ended in total devastation. The limp and lifeless bodies of once gods strewn across the cosmos. Though the gods could not defeat {{monster.name}}, {{monster.pronouns.subject}} fled back to whence {{monster.pronouns.subject}} had come. Yet all was not lost for the gods and their progeny.

{{#if mingleWithMonsterBlood}}
For {{$.gods.float_length}} the blood of {monster.name} and the {{$.gods.creative_parts}} of the gods mingled together. The blood of a chaos fiend bumping and mixing with the god-parts eventually led to a single substance, a writhing mass of blood and bone.
{{else}}
The {{$.gods.creative_parts}} floated through the {{$.monster.emerge_from}} for {{$.gods.float_length}}. Over time, they bumped and collided with one another. The mingling caused them to become one substance, a writhing mass of congealed god-parts.
{{/if}}

Their union congealed and gave birth to a new generation of gods.

---!story#ending_victory

{{slayer.name}} swung with {{slayer.pronouns.possessive}} {{slayer.favoredWeapon}}, bringing it down with a heavy crash. With all {{slayer.pronouns.possessive}} might {{slayer.pronouns.subject}} {{$.gods.kill_verb}} the head of {{monster.name}} clean off. {{slayer.name}} raised the head of {{monster.name}} aloft.

{{#if tired}}
Though {{slayer.pronouns.subject}} was wearied and wounded, the pride of victory swelled in {{slayer.pronouns.possessive}} breast. {{capitalize slayer.pronouns.subject}} was covered in sweat and blood, yet the thrill of battle buzzed in {{slayer.pronouns.possessive}} mind.
{{/if}}

In a state of pure {{$.gods.creative_state}}, {{slayer.name}} {{$.gods.creative_act}} the {{$.gods.creative_fluids}} of the gods with the blood pouring from {{possessive monster.name}} skull. From the frothy mixture emerged a new generation of gods.

---!workflow
story:
    - opener:
        dictionary_scope: chaos
        add_pronouns:
            - monster
    - war_start:
        dictionary_scope: chaos
        add_pronouns:
            - monster
            - participants
    - war_length:
        add_pronouns:
            - monster
            - participants
    - play_by_play:
        external: true
    - ending_defeat:
        dictionary_scope: chaos
        add_pronouns:
            - monster
        condition:
            - "!monsterDead"
    - ending_victory:
        add_pronouns:
            - slayer
        dictionary_scope: chaos
        condition:
            - "!!monsterDead"
