---!story#opener

Out of the {$.monster.emerge_from}, {monster.name} emerged. A {$.monster.adjective} {monster.type}, {monster.pronouns.subject} {$.monster.evil_act}. {monster.pronouns.possessive} {$.monster.evil_descriptor} was great, and it broke the souls of the newly formed gods. But {monster.pronouns.possessive} reign was not to last.


---!story#war_start

[participants.length > 1]
{@series participants "name"} banded together, [!allGods]a rebel party, rising up to do what the rest could not.[else]a cohort of all the gods of the cosmos, working in one accord.[end] Together they engaged the {monster.type} in pitched battle, seeking once and for all to cast down {monster.pronouns.possessive} {$.monster.supremacy}.
[else]
Only one had the courage to stand against the {$.monster.reign_descriptor} of {monster.name}. {participant.0.name}, {@godOrGoddess participant.0.gender} of {participant.0.archetype}, confronted the {monster.type} in pitched battle.
[end]


---!story#play_by_play

{@map events @include combat.story participants}

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
    - play_by_play:
        add_pronouns:
            - participants
        stories:
            - combat.story
