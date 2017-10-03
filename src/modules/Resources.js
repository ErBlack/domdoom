const promises = [];

function loadResource(src) {
    const image = new Image();
    promises.push(
        new Promise((resolve, reject) => {
            Object.assign(image, {
                onload: resolve,
                onerror: reject,
                src: src
            });
        })
    );

    return image;
}

export const WALLS = {
    regular: [
        loadResource(require('../images/walls/wall48_1.png')),
        loadResource(require('../images/walls/wall48_2.png')),
        loadResource(require('../images/walls/wall48_3.png')),
        loadResource(require('../images/walls/wall48_4.png'))
    ],
    bloody: [
        loadResource(require('../images/walls/wall49_1.png')),
        loadResource(require('../images/walls/wall49_2.png')),
        loadResource(require('../images/walls/wall49_3.png')),
        loadResource(require('../images/walls/wall49_4.png'))
    ],
    border: [
        loadResource(require('../images/walls/wall59_1.png')),
        loadResource(require('../images/walls/wall59_2.png')),
        loadResource(require('../images/walls/wall59_3.png')),
        loadResource(require('../images/walls/wall59_4.png'))
    ],
    fontain: [
        loadResource(require('../images/walls/wall58_1.png')),
        loadResource(require('../images/walls/wall58_2.png')),
        loadResource(require('../images/walls/wall58_3.png'))
    ],
    wide_corpse: [
        loadResource(require('../images/walls/wall50_1.png')),
        loadResource(require('../images/walls/wall50_2.png'))
    ],
    corpse: [
        loadResource(require('../images/walls/wall51_2.png')),
        loadResource(require('../images/walls/wall51_3.png'))
    ]
}

export const EFFECTS = {
    shot: [
        loadResource(require('../images/effects/puffa0.png')),
        loadResource(require('../images/effects/puffb0.png')),
        loadResource(require('../images/effects/puffc0.png')),
        loadResource(require('../images/effects/puffd0.png'))
    ],
    teleport: [
        loadResource(require('../images/effects/tfoga0.png')),
        loadResource(require('../images/effects/tfogb0.png')),
        loadResource(require('../images/effects/tfogc0.png')),
        loadResource(require('../images/effects/tfogd0.png')),
        loadResource(require('../images/effects/tfoge0.png')),
        loadResource(require('../images/effects/tfogf0.png')),
        loadResource(require('../images/effects/tfogg0.png')),
        loadResource(require('../images/effects/tfogh0.png')),
        loadResource(require('../images/effects/tfogi0.png')),
        loadResource(require('../images/effects/tfogj0.png'))
    ],
    blood: [
        loadResource(require('../images/effects/bluda0.png')),
        loadResource(require('../images/effects/bludb0.png')),
        loadResource(require('../images/effects/bludc0.png'))
    ]
}

export const CACODEMON = {
    regular: [
        loadResource(require('../images/npc/heada1.png')),
        loadResource(require('../images/npc/heada2a8.png')),
        loadResource(require('../images/npc/heada3a7.png')),
        loadResource(require('../images/npc/heada4a6.png')),
        loadResource(require('../images/npc/heada5.png')),
    ],
    hit: [
        loadResource(require('../images/npc/heade1.png')),
        loadResource(require('../images/npc/headf1.png'))
    ],
    blink_start: [
        loadResource(require('../images/npc/heade1.png')),
        loadResource(require('../images/npc/heade2e8.png')),
        loadResource(require('../images/npc/heade3e7.png')),
        loadResource(require('../images/npc/heade4e6.png')),
        loadResource(require('../images/npc/heade5.png')),
    ],
    blink_end: [
        loadResource(require('../images/npc/headf1.png')),
        loadResource(require('../images/npc/headf2f8.png')),
        loadResource(require('../images/npc/headf3f7.png')),
        loadResource(require('../images/npc/headf4f6.png')),
        loadResource(require('../images/npc/headf5.png')),
    ],
    death: [
        loadResource(require('../images/npc/headg0.png')),
        loadResource(require('../images/npc/headh0.png')),
        loadResource(require('../images/npc/headi0.png')),
        loadResource(require('../images/npc/headj0.png')),
        loadResource(require('../images/npc/headk0.png')),
        loadResource(require('../images/npc/headl0.png'))
    ]
}

export const SHOTGUN = loadResource(require('../images/weapoons/shota0.png'));

export const resourcesLoad = Promise.all(promises);
