import * as THREE from 'three';

/**
 * RobotModel
 * 
 * High-fidelity, fully articulated 3D humanoid robot assistant constructed in Three.js.
 * Combines:
 * - Friendly cute robotic head (expressive golden LED eyes, blinking eyelids, mouse-tracking pupils, smiling mouth, antenna with glowing tip, mechanical ears)
 * - Articulated mini humanoid mechanical body (glossy dark metallic armor, champagne gold mechanical joints, pulsing illuminated chest core, articulated shoulders, elbows, wrists, 5-finger hands, articulated legs and thruster feet).
 * 
 * Supports programmatic blending across:
 * - IDLE (floating sine wave, pulsing chest core, natural blinking, subtle limb sways)
 * - GREETING (entrance rise, look at user, blink, friendly right-arm wave, head tilt)
 * - WAVE (multi-cycle friendly wave)
 * - THINKING (head tilt, hand to chin, thoughtful eye shift)
 * - POINTING (left arm extended pointing towards portfolio content, fingers curled)
 * - THUMBS_UP (fist curled, thumb pointing straight up, energetic head nod)
 * - CLICK_REACTION (cheerful hop/bounce, eye flash, wave)
 * - MOUSE / CURSOR TRACKING (smooth head yaw/pitch and eye pupil translation within safe bounds)
 */

export class RobotModel {
  constructor() {
    this.group = new THREE.Group();

    // Color Palette Tokens — Champagne Gold update
    this.colors = {
      midnightBlack: 0x080B10,       // head/body shell outer armour — kept dark
      darkMetallic: 0x252525,        // graphite for joints (was 0x151B24)
      champagneGold: 0xE8C77A,       // primary champagne gold (was 0xC9A227)
      highlightGold: 0xFFD700,       // pure-gold highlights (was 0xE5C76B)
      visorDark: 0x05070A,           // keep
      eyeSocket: 0x030508,           // keep
      thrusterCyan: 0x38bdf8,        // keep
      eyeAmber: 0xFFB347,            // warm amber for eyes & eye-light
    };

    // Shared Materials — Champagne Gold finish
    this.materials = {
      // Main body armour panels → champagne gold #E8C77A
      shell: new THREE.MeshPhysicalMaterial({
        color: this.colors.champagneGold,
        metalness: 0.9,
        roughness: 0.12,
        reflectivity: 0.9,
        clearcoat: 0.3,
        clearcoatRoughness: 0.1,
      }),
      // Joints / structural parts → dark graphite #252525
      darkMetal: new THREE.MeshStandardMaterial({
        color: this.colors.darkMetallic,
        metalness: 0.85,
        roughness: 0.35,
      }),
      // Decorative gold details → bright champagne #E8C77A
      gold: new THREE.MeshPhysicalMaterial({
        color: this.colors.champagneGold,
        metalness: 0.95,
        roughness: 0.1,
        reflectivity: 1.0,
        clearcoat: 0.2,
        clearcoatRoughness: 0.08,
      }),
      visor: new THREE.MeshStandardMaterial({
        color: this.colors.visorDark,
        metalness: 0.92,
        roughness: 0.1,
      }),
      // Eyes → warm amber #FFB347
      eyeLed: new THREE.MeshStandardMaterial({
        color: this.colors.eyeAmber,
        emissive: this.colors.eyeAmber,
        emissiveIntensity: 2.0,
        roughness: 0.1,
      }),
      pupil: new THREE.MeshStandardMaterial({
        color: 0x1A1406,
        metalness: 0.9,
        roughness: 0.2,
      }),
      eyelid: new THREE.MeshStandardMaterial({
        color: this.colors.midnightBlack,
        metalness: 0.88,
        roughness: 0.18,
      }),
      // Mouth → pure gold #FFD700
      mouth: new THREE.MeshStandardMaterial({
        color: this.colors.highlightGold,
        emissive: this.colors.highlightGold,
        emissiveIntensity: 1.8,
        roughness: 0.12,
      }),
      // Chest core → pure gold #FFD700 with strong glow
      chestCore: new THREE.MeshStandardMaterial({
        color: this.colors.highlightGold,
        emissive: this.colors.highlightGold,
        emissiveIntensity: 2.5,
        roughness: 0.12,
      }),
      thruster: new THREE.MeshStandardMaterial({
        color: this.colors.thrusterCyan,
        emissive: this.colors.thrusterCyan,
        emissiveIntensity: 1.2,
        roughness: 0.3,
      }),
    };

    // Tracking references for animation
    this.joints = {};
    this.lights = {};

    // Animation state machine
    this.state = 'IDLE'; // 'IDLE' | 'GREETING' | 'WAVE' | 'THINKING' | 'POINTING' | 'THUMBS_UP' | 'CLICK'
    this.stateTime = 0;
    this.stateDuration = 0;
    this.returnToState = 'IDLE';

    // Blinking timer
    this.blinkTimer = 2.0;
    this.blinkProgress = 0;
    this.isBlinking = false;
    this.blinkDuration = 0.22;

    // Mouse Tracking target & current
    this.cursorTarget = { x: 0, y: 0 };
    this.cursorCurrent = { x: 0, y: 0 };
    this.isTracking = true;

    // Hover state
    this.isHovered = false;

    // Build the 3D character hierarchy
    this._buildModel();
  }

  _buildModel() {
    // 1. Floating Root Container
    this.floatingRoot = new THREE.Group();
    this.group.add(this.floatingRoot);

    // 2. Torso Assembly (Pelvis, Spine, Chest Armor, Core)
    this.torso = new THREE.Group();
    this.torso.position.y = 0.75;
    this.floatingRoot.add(this.torso);

    // 2a. Pelvis
    const pelvisGeom = new THREE.CylinderGeometry(0.38, 0.32, 0.26, 16);
    const pelvis = new THREE.Mesh(pelvisGeom, this.materials.darkMetal);
    pelvis.position.y = 0;
    this.torso.add(pelvis);

    const pelvisBelt = new THREE.Mesh(
      new THREE.TorusGeometry(0.39, 0.035, 12, 24),
      this.materials.gold
    );
    pelvisBelt.rotation.x = Math.PI / 2;
    this.torso.add(pelvisBelt);

    // 2b. Segmented Spine
    for (let i = 0; i < 3; i++) {
      const vert = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24 - i * 0.015, 0.26 - i * 0.015, 0.07, 16),
        i % 2 === 0 ? this.materials.gold : this.materials.darkMetal
      );
      vert.position.y = 0.18 + i * 0.09;
      this.torso.add(vert);
    }

    // 2c. Chest Armor Carapace
    const chestGroup = new THREE.Group();
    chestGroup.position.y = 0.62;
    this.torso.add(chestGroup);
    this.joints.chest = chestGroup;

    const chestBodyGeom = new THREE.BoxGeometry(0.72, 0.54, 0.54);
    // Bevel edges roughly with chamfered geometry or compound
    const chestBody = new THREE.Mesh(chestBodyGeom, this.materials.shell);
    chestGroup.add(chestBody);

    // Gold collar plate
    const collar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.36, 0.1, 16),
      this.materials.gold
    );
    collar.position.y = 0.28;
    chestGroup.add(collar);

    // 2d. Illuminated Circular Golden Chest Core
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0.02, 0.28);
    chestGroup.add(coreGroup);

    const coreRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.14, 0.028, 16, 32),
      this.materials.gold
    );
    coreGroup.add(coreRing);

    const coreDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.04, 24),
      this.materials.chestCore
    );
    coreDisc.rotation.x = Math.PI / 2;
    coreGroup.add(coreDisc);
    this.joints.chestCore = coreDisc;

    // Warm amber chest point light
    const coreLight = new THREE.PointLight(this.colors.eyeAmber, 1.6, 3.0);
    coreLight.position.set(0, 0, 0.1);
    coreGroup.add(coreLight);
    this.lights.core = coreLight;

    // 3. Articulated Neck & Head
    const neckPivot = new THREE.Group();
    neckPivot.position.y = 0.38;
    chestGroup.add(neckPivot);
    this.joints.neck = neckPivot;

    const neckCylinder = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.16, 0.14, 16),
      this.materials.gold
    );
    neckCylinder.position.y = 0.07;
    neckPivot.add(neckCylinder);

    // Head Group (centered above neck)
    const headGroup = new THREE.Group();
    headGroup.position.y = 0.52;
    neckPivot.add(headGroup);
    this.joints.head = headGroup;

    // 3a. Rounded Helmet Shell (cute proportions, midnight black glossy)
    const headGeom = new THREE.SphereGeometry(0.66, 32, 32);
    headGeom.scale(1.16, 1.05, 1.0);
    const headMesh = new THREE.Mesh(headGeom, this.materials.shell);
    headGroup.add(headMesh);

    // 3b. Dark Curved Visor Face Plate
    const visorGeom = new THREE.SphereGeometry(0.58, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.48);
    visorGeom.scale(1.12, 0.95, 0.85);
    const visorMesh = new THREE.Mesh(visorGeom, this.materials.visor);
    visorMesh.position.set(0, -0.02, 0.22);
    visorMesh.rotation.x = 0.22;
    headGroup.add(visorMesh);

    // 3c. Expressive Golden LED Eyes
    const createEye = (isLeft) => {
      const eyeRoot = new THREE.Group();
      const xSign = isLeft ? -1 : 1;
      eyeRoot.position.set(xSign * 0.27, 0.06, 0.52);

      // Gold Bezel Socket
      const socket = new THREE.Mesh(
        new THREE.TorusGeometry(0.13, 0.022, 16, 24),
        this.materials.gold
      );
      eyeRoot.add(socket);

      // Glowing Golden Eye Disc
      const ledDisc = new THREE.Mesh(
        new THREE.CircleGeometry(0.12, 24),
        this.materials.eyeLed
      );
      eyeRoot.add(ledDisc);

      // Moving Pupil Ring (tracks cursor)
      const pupil = new THREE.Mesh(
        new THREE.RingGeometry(0.045, 0.08, 16),
        this.materials.pupil
      );
      pupil.position.z = 0.005;
      eyeRoot.add(pupil);

      // Upper Eyelid for Blinking
      const lidUpper = new THREE.Mesh(
        new THREE.CircleGeometry(0.125, 24, 0, Math.PI),
        this.materials.eyelid
      );
      lidUpper.position.z = 0.01;
      eyeRoot.add(lidUpper);

      // Lower Eyelid for Blinking
      const lidLower = new THREE.Mesh(
        new THREE.CircleGeometry(0.125, 24, Math.PI, Math.PI),
        this.materials.eyelid
      );
      lidLower.position.z = 0.01;
      eyeRoot.add(lidLower);

      return { root: eyeRoot, pupil, lidUpper, lidLower };
    };

    this.leftEye = createEye(true);
    this.rightEye = createEye(false);
    headGroup.add(this.leftEye.root);
    headGroup.add(this.rightEye.root);

    // Warm amber eye light casting forward
    const eyeLight = new THREE.PointLight(this.colors.eyeAmber, 1.8, 3.2);
    eyeLight.position.set(0, 0.1, 0.7);
    headGroup.add(eyeLight);
    this.lights.eyes = eyeLight;

    // 3d. Friendly Curved Smiling Mouth
    const mouthGeom = new THREE.TorusGeometry(0.16, 0.018, 12, 20, Math.PI * 0.65);
    const mouthMesh = new THREE.Mesh(mouthGeom, this.materials.mouth);
    mouthMesh.rotation.z = Math.PI * 1.17;
    mouthMesh.position.set(0, -0.16, 0.54);
    headGroup.add(mouthMesh);
    this.joints.mouth = mouthMesh;

    // 3e. Small Golden Antenna on top
    const antennaGroup = new THREE.Group();
    antennaGroup.position.set(0, 0.68, 0);
    headGroup.add(antennaGroup);

    const antBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.12, 0.08, 16),
      this.materials.gold
    );
    antennaGroup.add(antBase);

    const antPole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.03, 0.32, 12),
      this.materials.gold
    );
    antPole.position.y = 0.18;
    antennaGroup.add(antPole);

    const antOrb = new THREE.Mesh(
      new THREE.SphereGeometry(0.065, 16, 16),
      this.materials.eyeLed
    );
    antOrb.position.y = 0.36;
    antennaGroup.add(antOrb);

    // 3f. Detailed Mechanical Ears
    const createEar = (isLeft) => {
      const earGroup = new THREE.Group();
      const xSign = isLeft ? -1 : 1;
      earGroup.position.set(xSign * 0.75, 0.02, 0);

      const podOuter = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.18, 0.1, 20),
        this.materials.darkMetal
      );
      podOuter.rotation.z = Math.PI / 2;
      earGroup.add(podOuter);

      const podRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.17, 0.025, 12, 24),
        this.materials.gold
      );
      podRing.rotation.y = Math.PI / 2;
      earGroup.add(podRing);

      const podCore = new THREE.Mesh(
        new THREE.CylinderGeometry(0.09, 0.09, 0.14, 16),
        this.materials.gold
      );
      podCore.rotation.z = Math.PI / 2;
      earGroup.add(podCore);

      return earGroup;
    };

    headGroup.add(createEar(true));
    headGroup.add(createEar(false));

    // 4. Articulated Mechanical Arms (Left & Right)
    const createArm = (isLeft) => {
      const armRoot = new THREE.Group();
      const xSign = isLeft ? -1 : 1;
      armRoot.position.set(xSign * 0.44, 0.18, 0);

      // Shoulder ball joint
      const shoulderBall = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 16, 16),
        this.materials.gold
      );
      armRoot.add(shoulderBall);

      // Shoulder Armor Cowl
      const cowl = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.55),
        this.materials.shell
      );
      cowl.position.y = 0.04;
      armRoot.add(cowl);

      // Upper Arm Pivot
      const upperArm = new THREE.Group();
      armRoot.add(upperArm);

      const bicep = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.095, 0.36, 14),
        this.materials.darkMetal
      );
      bicep.position.y = -0.19;
      upperArm.add(bicep);

      const hydraulicLine = new THREE.Mesh(
        new THREE.CylinderGeometry(0.022, 0.022, 0.32, 8),
        this.materials.gold
      );
      hydraulicLine.position.set(xSign * 0.06, -0.19, 0.03);
      upperArm.add(hydraulicLine);

      // Elbow Joint
      const elbow = new THREE.Group();
      elbow.position.y = -0.38;
      upperArm.add(elbow);

      const elbowDisc = new THREE.Mesh(
        new THREE.CylinderGeometry(0.09, 0.09, 0.1, 14),
        this.materials.gold
      );
      elbowDisc.rotation.z = Math.PI / 2;
      elbow.add(elbowDisc);

      // Forearm
      const forearm = new THREE.Group();
      elbow.add(forearm);

      const gauntlet = new THREE.Mesh(
        new THREE.CylinderGeometry(0.095, 0.075, 0.34, 14),
        this.materials.shell
      );
      gauntlet.position.y = -0.18;
      forearm.add(gauntlet);

      // Wrist Joint
      const wrist = new THREE.Group();
      wrist.position.y = -0.36;
      forearm.add(wrist);

      const wristBall = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 12, 12),
        this.materials.gold
      );
      wrist.add(wristBall);

      // Hand & 5 Articulated Fingers
      const hand = new THREE.Group();
      wrist.add(hand);

      const palm = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.1, 0.06),
        this.materials.darkMetal
      );
      palm.position.y = -0.05;
      hand.add(palm);

      // Create individual articulated fingers
      const fingers = {};
      const fingerNames = ['thumb', 'index', 'middle', 'ring', 'pinky'];
      fingerNames.forEach((fName, fIdx) => {
        const fingerGroup = new THREE.Group();
        if (fName === 'thumb') {
          fingerGroup.position.set(xSign * 0.07, -0.04, 0.02);
          fingerGroup.rotation.z = xSign * 0.45;
        } else {
          const xOffset = (-0.045 + (fIdx - 1) * 0.03) * xSign;
          fingerGroup.position.set(xOffset, -0.1, 0);
        }

        const seg1 = new THREE.Mesh(
          new THREE.CylinderGeometry(0.016, 0.016, 0.065, 8),
          this.materials.gold
        );
        seg1.position.y = -0.032;
        fingerGroup.add(seg1);

        const tipJoint = new THREE.Group();
        tipJoint.position.y = -0.065;
        fingerGroup.add(tipJoint);

        const seg2 = new THREE.Mesh(
          new THREE.CylinderGeometry(0.014, 0.015, 0.05, 8),
          this.materials.darkMetal
        );
        seg2.position.y = -0.025;
        tipJoint.add(seg2);

        hand.add(fingerGroup);
        fingers[fName] = { root: fingerGroup, tip: tipJoint };
      });

      return {
        root: armRoot,
        upperArm,
        elbow,
        forearm,
        wrist,
        hand,
        fingers,
      };
    };

    this.leftArm = createArm(true);
    this.rightArm = createArm(false);
    chestGroup.add(this.leftArm.root);
    chestGroup.add(this.rightArm.root);

    // 5. Articulated Legs and Feet (Left & Right)
    const createLeg = (isLeft) => {
      const legRoot = new THREE.Group();
      const xSign = isLeft ? -1 : 1;
      legRoot.position.set(xSign * 0.22, -0.14, 0);

      // Hip ball joint
      const hip = new THREE.Mesh(
        new THREE.SphereGeometry(0.11, 14, 14),
        this.materials.gold
      );
      legRoot.add(hip);

      // Thigh
      const thighGroup = new THREE.Group();
      legRoot.add(thighGroup);

      const thigh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.11, 0.095, 0.42, 14),
        this.materials.shell
      );
      thigh.position.y = -0.22;
      thighGroup.add(thigh);

      // Knee Joint
      const kneeGroup = new THREE.Group();
      kneeGroup.position.y = -0.44;
      thighGroup.add(kneeGroup);

      const kneeDisc = new THREE.Mesh(
        new THREE.CylinderGeometry(0.095, 0.095, 0.1, 14),
        this.materials.gold
      );
      kneeDisc.rotation.z = Math.PI / 2;
      kneeGroup.add(kneeDisc);

      // Shin / Calf
      const shinGroup = new THREE.Group();
      kneeGroup.add(shinGroup);

      const shin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.095, 0.08, 0.4, 14),
        this.materials.darkMetal
      );
      shin.position.y = -0.21;
      shinGroup.add(shin);

      // Ankle & Foot
      const footGroup = new THREE.Group();
      footGroup.position.y = -0.42;
      shinGroup.add(footGroup);

      const footMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.08, 0.26),
        this.materials.shell
      );
      footMesh.position.set(0, -0.04, 0.05);
      footGroup.add(footMesh);

      const footToe = new THREE.Mesh(
        new THREE.BoxGeometry(0.13, 0.06, 0.08),
        this.materials.gold
      );
      footToe.position.set(0, -0.04, 0.19);
      footGroup.add(footToe);

      // Soft magnetic thruster glow under sole
      const thrusterGlow = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.08, 0.02, 16),
        this.materials.thruster
      );
      thrusterGlow.position.set(0, -0.085, 0.06);
      footGroup.add(thrusterGlow);

      return {
        root: legRoot,
        thigh: thighGroup,
        knee: kneeGroup,
        shin: shinGroup,
        foot: footGroup,
      };
    };

    this.leftLeg = createLeg(true);
    this.rightLeg = createLeg(false);
    this.torso.add(this.leftLeg.root);
    this.torso.add(this.rightLeg.root);

    // Initial neutral pose
    this._setNeutralArmPose();
  }

  _setNeutralArmPose() {
    // Left Arm relaxed
    this.leftArm.upperArm.rotation.set(0.1, 0, 0.18);
    this.leftArm.elbow.rotation.set(-0.25, 0, 0);
    this.leftArm.wrist.rotation.set(0, 0, 0);

    // Right Arm relaxed
    this.rightArm.upperArm.rotation.set(0.1, 0, -0.18);
    this.rightArm.elbow.rotation.set(-0.25, 0, 0);
    this.rightArm.wrist.rotation.set(0, 0, 0);

    // Relaxed fingers
    const relaxHand = (arm) => {
      Object.keys(arm.fingers).forEach((fName) => {
        const f = arm.fingers[fName];
        f.root.rotation.x = 0.22;
        f.tip.rotation.x = 0.25;
      });
    };
    relaxHand(this.leftArm);
    relaxHand(this.rightArm);

    // Slightly bend knees for natural hover stance
    this.leftLeg.thigh.rotation.x = 0.12;
    this.leftLeg.knee.rotation.x = -0.22;
    this.rightLeg.thigh.rotation.x = 0.12;
    this.rightLeg.knee.rotation.x = -0.22;
  }

  // --- Animation Controls ---

  playGreeting() {
    this.state = 'GREETING';
    this.stateTime = 0;
    this.stateDuration = 4.2;
    this.returnToState = 'IDLE';
  }

  playWave() {
    this.state = 'WAVE';
    this.stateTime = 0;
    this.stateDuration = 3.4;
    this.returnToState = 'IDLE';
  }

  playThinking() {
    this.state = 'THINKING';
    this.stateTime = 0;
    this.stateDuration = 3.8;
    this.returnToState = 'IDLE';
  }

  playPointing() {
    this.state = 'POINTING';
    this.stateTime = 0;
    this.stateDuration = 3.6;
    this.returnToState = 'IDLE';
  }

  playThumbsUp() {
    this.state = 'THUMBS_UP';
    this.stateTime = 0;
    this.stateDuration = 3.2;
    this.returnToState = 'IDLE';
  }

  playClickReaction() {
    this.state = 'CLICK';
    this.stateTime = 0;
    this.stateDuration = 2.2;
    this.returnToState = 'IDLE';
  }

  setCursor(nx, ny) {
    if (!this.isTracking) return;
    this.cursorTarget.x = THREE.MathUtils.clamp(nx, -1, 1);
    this.cursorTarget.y = THREE.MathUtils.clamp(ny, -1, 1);
  }

  setTracking(enabled) {
    this.isTracking = enabled;
    if (!enabled) {
      this.cursorTarget.x = 0;
      this.cursorTarget.y = 0;
    }
  }

  setHover(hovered) {
    this.isHovered = hovered;
  }

  triggerBlink() {
    this.isBlinking = true;
    this.blinkProgress = 0;
  }

  // --- Update Loop ---

  update(delta) {
    this.stateTime += delta;

    // 1. Natural Blinking Controller
    this.blinkTimer -= delta;
    if (this.blinkTimer <= 0 && !this.isBlinking) {
      this.triggerBlink();
      // Schedule next blink in 3.0 to 5.5s, with 20% chance of quick double-blink
      const isDouble = Math.random() < 0.22;
      this.blinkTimer = isDouble ? 0.35 : 3.2 + Math.random() * 2.4;
    }

    if (this.isBlinking) {
      this.blinkProgress += delta / this.blinkDuration;
      let closeAmount = 0;
      if (this.blinkProgress <= 0.5) {
        closeAmount = this.blinkProgress * 2; // 0 to 1
      } else if (this.blinkProgress <= 1.0) {
        closeAmount = (1.0 - this.blinkProgress) * 2; // 1 to 0
      } else {
        this.isBlinking = false;
        closeAmount = 0;
      }

      // Smooth eyelid closure (scale Y of upper and lower eyelids)
      const scaleY = THREE.MathUtils.lerp(0.001, 1.0, closeAmount);
      this.leftEye.lidUpper.scale.y = scaleY;
      this.leftEye.lidLower.scale.y = scaleY;
      this.rightEye.lidUpper.scale.y = scaleY;
      this.rightEye.lidLower.scale.y = scaleY;
    } else {
      this.leftEye.lidUpper.scale.y = 0.001;
      this.leftEye.lidLower.scale.y = 0.001;
      this.rightEye.lidUpper.scale.y = 0.001;
      this.rightEye.lidLower.scale.y = 0.001;
    }

    // 2. Cursor Interpolation & Pupil Shift
    const lerpFactor = Math.min(1.0, delta * 5.0);
    this.cursorCurrent.x += (this.cursorTarget.x - this.cursorCurrent.x) * lerpFactor;
    this.cursorCurrent.y += (this.cursorTarget.y - this.cursorCurrent.y) * lerpFactor;

    // Shift eye pupils based on cursor
    const pupilMaxX = 0.038;
    const pupilMaxY = 0.035;
    const px = this.cursorCurrent.x * pupilMaxX;
    const py = -this.cursorCurrent.y * pupilMaxY;
    this.leftEye.pupil.position.x = px;
    this.leftEye.pupil.position.y = py;
    this.rightEye.pupil.position.x = px;
    this.rightEye.pupil.position.y = py;

    // 3. Chest Core Pulsing Light
    const pulseT = Date.now() * 0.0035;
    const corePulse = 1.8 + Math.sin(pulseT) * 0.6;
    this.materials.chestCore.emissiveIntensity = corePulse;
    if (this.lights.core) {
      this.lights.core.intensity = 0.9 + Math.sin(pulseT) * 0.45;
    }

    // 4. State Machine Animation Dispatch
    switch (this.state) {
      case 'GREETING':
        this._updateGreeting(delta);
        break;
      case 'WAVE':
        this._updateWave(delta);
        break;
      case 'THINKING':
        this._updateThinking(delta);
        break;
      case 'POINTING':
        this._updatePointing(delta);
        break;
      case 'THUMBS_UP':
        this._updateThumbsUp(delta);
        break;
      case 'CLICK':
        this._updateClick(delta);
        break;
      case 'IDLE':
      default:
        this._updateIdle(delta);
        break;
    }

    // State Timeout Transition
    if (this.stateDuration > 0 && this.stateTime >= this.stateDuration) {
      this.state = this.returnToState;
      this.stateTime = 0;
      this.stateDuration = 0;
    }
  }

  // --- Animation Subroutines ---

  _updateIdle(delta) {
    const t = Date.now() * 0.0018;

    // Gentle vertical floating sine wave
    this.floatingRoot.position.y = Math.sin(t) * 0.08;

    // Subtle breathing chest expansion & head nod
    this.torso.rotation.x = Math.sin(t * 0.9) * 0.03;
    this.torso.rotation.z = Math.cos(t * 0.7) * 0.02;

    // Head tracking with mouse cursor within safe bounds (yaw: +-35 deg, pitch: +-20 deg)
    const targetYaw = this.cursorCurrent.x * 0.6;
    const targetPitch = this.cursorCurrent.y * 0.35 + Math.sin(t * 1.1) * 0.03;
    this.joints.neck.rotation.y = THREE.MathUtils.lerp(this.joints.neck.rotation.y, targetYaw, delta * 6.0);
    this.joints.neck.rotation.x = THREE.MathUtils.lerp(this.joints.neck.rotation.x, targetPitch, delta * 6.0);
    this.joints.neck.rotation.z = THREE.MathUtils.lerp(this.joints.neck.rotation.z, -this.cursorCurrent.x * 0.1, delta * 6.0);

    // Subtle limb swaying matching float
    this.leftArm.upperArm.rotation.x = 0.1 + Math.sin(t) * 0.04;
    this.leftArm.upperArm.rotation.z = 0.18 + Math.cos(t * 0.8) * 0.03;
    this.leftArm.elbow.rotation.x = -0.25 + Math.sin(t) * 0.03;

    this.rightArm.upperArm.rotation.x = 0.1 + Math.sin(t) * 0.04;
    this.rightArm.upperArm.rotation.z = -0.18 - Math.cos(t * 0.8) * 0.03;
    this.rightArm.elbow.rotation.x = -0.25 + Math.sin(t) * 0.03;

    // Gently relaxed fingers
    const relaxArmFingers = (arm) => {
      Object.keys(arm.fingers).forEach((fName) => {
        arm.fingers[fName].root.rotation.x = 0.22 + Math.sin(t + 0.5) * 0.04;
        arm.fingers[fName].tip.rotation.x = 0.25;
      });
    };
    relaxArmFingers(this.leftArm);
    relaxArmFingers(this.rightArm);

    // Relaxed hovering legs
    this.leftLeg.thigh.rotation.x = 0.12 + Math.sin(t) * 0.03;
    this.leftLeg.knee.rotation.x = -0.22 - Math.sin(t) * 0.03;
    this.rightLeg.thigh.rotation.x = 0.12 + Math.sin(t) * 0.03;
    this.rightLeg.knee.rotation.x = -0.22 - Math.sin(t) * 0.03;
  }

  _updateGreeting(delta) {
    const t = this.stateTime;
    const progress = Math.min(1.0, t / this.stateDuration);

    // Float in entrance
    this.floatingRoot.position.y = Math.sin(Date.now() * 0.002) * 0.07;

    // Look directly towards viewer with friendly tilt
    this.joints.neck.rotation.y = THREE.MathUtils.lerp(this.joints.neck.rotation.y, 0, delta * 6.0);
    this.joints.neck.rotation.x = THREE.MathUtils.lerp(this.joints.neck.rotation.x, 0.08, delta * 6.0);
    this.joints.neck.rotation.z = THREE.MathUtils.lerp(this.joints.neck.rotation.z, -0.08, delta * 6.0);

    // Right arm raises up and waves
    if (progress < 0.25) {
      // Raise arm
      const p = progress / 0.25;
      this.rightArm.upperArm.rotation.x = THREE.MathUtils.lerp(0.1, 1.2, p);
      this.rightArm.upperArm.rotation.z = THREE.MathUtils.lerp(-0.18, -0.6, p);
      this.rightArm.elbow.rotation.x = THREE.MathUtils.lerp(-0.25, -1.3, p);
      this.rightArm.wrist.rotation.z = 0;
    } else if (progress < 0.85) {
      // Waving side to side
      const waveT = (progress - 0.25) * 16.0;
      const waveAngle = Math.sin(waveT) * 0.55;
      this.rightArm.upperArm.rotation.x = 1.35;
      this.rightArm.upperArm.rotation.z = -0.65;
      this.rightArm.elbow.rotation.x = -1.4;
      this.rightArm.elbow.rotation.z = waveAngle;
      this.rightArm.wrist.rotation.z = waveAngle * 0.6;

      // Fingers spread welcomingly
      Object.keys(this.rightArm.fingers).forEach((fName) => {
        this.rightArm.fingers[fName].root.rotation.x = 0.05;
        this.rightArm.fingers[fName].tip.rotation.x = 0.05;
      });
    } else {
      // Lower arm back to idle
      const p = (progress - 0.85) / 0.15;
      this.rightArm.upperArm.rotation.x = THREE.MathUtils.lerp(1.35, 0.1, p);
      this.rightArm.upperArm.rotation.z = THREE.MathUtils.lerp(-0.65, -0.18, p);
      this.rightArm.elbow.rotation.x = THREE.MathUtils.lerp(-1.4, -0.25, p);
      this.rightArm.elbow.rotation.z = THREE.MathUtils.lerp(this.rightArm.elbow.rotation.z, 0, p);
      this.rightArm.wrist.rotation.z = 0;
    }
  }

  _updateWave(delta) {
    const t = this.stateTime;
    const progress = Math.min(1.0, t / this.stateDuration);

    this.floatingRoot.position.y = Math.sin(Date.now() * 0.002) * 0.07;

    // Friendly head tilt
    this.joints.neck.rotation.z = THREE.MathUtils.lerp(this.joints.neck.rotation.z, -0.12, delta * 5.0);

    if (progress < 0.2) {
      // Raise arm
      const p = progress / 0.2;
      this.rightArm.upperArm.rotation.x = THREE.MathUtils.lerp(0.1, 1.3, p);
      this.rightArm.upperArm.rotation.z = THREE.MathUtils.lerp(-0.18, -0.6, p);
      this.rightArm.elbow.rotation.x = THREE.MathUtils.lerp(-0.25, -1.35, p);
    } else if (progress < 0.8) {
      // Waving
      const waveT = (progress - 0.2) * 14.0;
      const waveAngle = Math.sin(waveT) * 0.5;
      this.rightArm.elbow.rotation.z = waveAngle;
      this.rightArm.wrist.rotation.z = waveAngle * 0.5;
    } else {
      // Return
      const p = (progress - 0.8) / 0.2;
      this.rightArm.upperArm.rotation.x = THREE.MathUtils.lerp(1.3, 0.1, p);
      this.rightArm.upperArm.rotation.z = THREE.MathUtils.lerp(-0.6, -0.18, p);
      this.rightArm.elbow.rotation.x = THREE.MathUtils.lerp(-1.35, -0.25, p);
      this.rightArm.elbow.rotation.z = THREE.MathUtils.lerp(this.rightArm.elbow.rotation.z, 0, p);
    }
  }

  _updateThinking(delta) {
    const t = this.stateTime;
    const progress = Math.min(1.0, t / this.stateDuration);

    this.floatingRoot.position.y = Math.sin(Date.now() * 0.0016) * 0.05;

    // Head tilts thoughtfully to the side and slightly upwards
    this.joints.neck.rotation.y = THREE.MathUtils.lerp(this.joints.neck.rotation.y, 0.25, delta * 4.0);
    this.joints.neck.rotation.x = THREE.MathUtils.lerp(this.joints.neck.rotation.x, -0.22, delta * 4.0);
    this.joints.neck.rotation.z = THREE.MathUtils.lerp(this.joints.neck.rotation.z, 0.22, delta * 4.0);

    // Left arm raises with hand resting thoughtfully near chin
    if (progress < 0.3) {
      const p = progress / 0.3;
      this.leftArm.upperArm.rotation.x = THREE.MathUtils.lerp(0.1, 1.1, p);
      this.leftArm.upperArm.rotation.z = THREE.MathUtils.lerp(0.18, 0.45, p);
      this.leftArm.elbow.rotation.x = THREE.MathUtils.lerp(-0.25, -1.8, p);
      this.leftArm.wrist.rotation.y = THREE.MathUtils.lerp(0, -0.6, p);
    } else if (progress < 0.8) {
      this.leftArm.upperArm.rotation.x = 1.15;
      this.leftArm.upperArm.rotation.z = 0.48;
      this.leftArm.elbow.rotation.x = -1.85;
      this.leftArm.wrist.rotation.y = -0.65;

      // Fingers curved gently against cheek
      this.leftArm.fingers.index.root.rotation.x = 0.15;
      this.leftArm.fingers.middle.root.rotation.x = 0.35;
      this.leftArm.fingers.ring.root.rotation.x = 0.6;
      this.leftArm.fingers.pinky.root.rotation.x = 0.8;
    } else {
      const p = (progress - 0.8) / 0.2;
      this.leftArm.upperArm.rotation.x = THREE.MathUtils.lerp(1.15, 0.1, p);
      this.leftArm.upperArm.rotation.z = THREE.MathUtils.lerp(0.48, 0.18, p);
      this.leftArm.elbow.rotation.x = THREE.MathUtils.lerp(-1.85, -0.25, p);
      this.leftArm.wrist.rotation.y = THREE.MathUtils.lerp(-0.65, 0, p);
    }
  }

  _updatePointing(delta) {
    const t = this.stateTime;
    const progress = Math.min(1.0, t / this.stateDuration);

    this.floatingRoot.position.y = Math.sin(Date.now() * 0.002) * 0.06;

    // Head turns left towards the page content / projects
    this.joints.neck.rotation.y = THREE.MathUtils.lerp(this.joints.neck.rotation.y, -0.62, delta * 6.0);
    this.joints.neck.rotation.x = THREE.MathUtils.lerp(this.joints.neck.rotation.x, 0.05, delta * 6.0);

    // Left arm extends horizontally to the left, pointing index finger towards portfolio
    if (progress < 0.25) {
      const p = progress / 0.25;
      this.leftArm.upperArm.rotation.x = THREE.MathUtils.lerp(0.1, 0.85, p);
      this.leftArm.upperArm.rotation.y = THREE.MathUtils.lerp(0, -0.5, p);
      this.leftArm.upperArm.rotation.z = THREE.MathUtils.lerp(0.18, 0.95, p);
      this.leftArm.elbow.rotation.x = THREE.MathUtils.lerp(-0.25, -0.3, p);
    } else if (progress < 0.82) {
      this.leftArm.upperArm.rotation.x = 0.85;
      this.leftArm.upperArm.rotation.y = -0.5;
      this.leftArm.upperArm.rotation.z = 0.95;
      this.leftArm.elbow.rotation.x = -0.28;

      // Pointing hand: Index finger straight, Middle/Ring/Pinky curled tight, Thumb tucked
      this.leftArm.fingers.index.root.rotation.x = -0.05;
      this.leftArm.fingers.index.tip.rotation.x = 0.0;

      this.leftArm.fingers.middle.root.rotation.x = 1.6;
      this.leftArm.fingers.middle.tip.rotation.x = 1.4;
      this.leftArm.fingers.ring.root.rotation.x = 1.6;
      this.leftArm.fingers.ring.tip.rotation.x = 1.4;
      this.leftArm.fingers.pinky.root.rotation.x = 1.6;
      this.leftArm.fingers.pinky.tip.rotation.x = 1.4;

      this.leftArm.fingers.thumb.root.rotation.x = 0.9;
    } else {
      const p = (progress - 0.82) / 0.18;
      this.leftArm.upperArm.rotation.x = THREE.MathUtils.lerp(0.85, 0.1, p);
      this.leftArm.upperArm.rotation.y = THREE.MathUtils.lerp(-0.5, 0, p);
      this.leftArm.upperArm.rotation.z = THREE.MathUtils.lerp(0.95, 0.18, p);
      this.leftArm.elbow.rotation.x = THREE.MathUtils.lerp(-0.28, -0.25, p);

      // Relax fingers
      Object.keys(this.leftArm.fingers).forEach((fName) => {
        this.leftArm.fingers[fName].root.rotation.x = 0.22;
        this.leftArm.fingers[fName].tip.rotation.x = 0.25;
      });
    }
  }

  _updateThumbsUp(delta) {
    const t = this.stateTime;
    const progress = Math.min(1.0, t / this.stateDuration);

    this.floatingRoot.position.y = Math.sin(Date.now() * 0.002) * 0.06;

    // Friendly enthusiastic nod
    this.joints.neck.rotation.x = THREE.MathUtils.lerp(this.joints.neck.rotation.x, Math.sin(t * 8.0) * 0.1 + 0.08, delta * 8.0);
    this.joints.neck.rotation.y = THREE.MathUtils.lerp(this.joints.neck.rotation.y, 0, delta * 6.0);

    // Right arm raises forward, elbow at 90 deg, thumb pointed straight UP!
    if (progress < 0.25) {
      const p = progress / 0.25;
      this.rightArm.upperArm.rotation.x = THREE.MathUtils.lerp(0.1, 0.95, p);
      this.rightArm.upperArm.rotation.z = THREE.MathUtils.lerp(-0.18, -0.15, p);
      this.rightArm.elbow.rotation.x = THREE.MathUtils.lerp(-0.25, -1.5, p);
      this.rightArm.wrist.rotation.z = THREE.MathUtils.lerp(0, -Math.PI / 2, p);
    } else if (progress < 0.8) {
      this.rightArm.upperArm.rotation.x = 0.95;
      this.rightArm.upperArm.rotation.z = -0.15;
      this.rightArm.elbow.rotation.x = -1.5;
      this.rightArm.wrist.rotation.z = -Math.PI / 2;

      // Curled fist: 4 fingers bent into palm
      this.rightArm.fingers.index.root.rotation.x = 1.7;
      this.rightArm.fingers.index.tip.rotation.x = 1.5;
      this.rightArm.fingers.middle.root.rotation.x = 1.7;
      this.rightArm.fingers.middle.tip.rotation.x = 1.5;
      this.rightArm.fingers.ring.root.rotation.x = 1.7;
      this.rightArm.fingers.ring.tip.rotation.x = 1.5;
      this.rightArm.fingers.pinky.root.rotation.x = 1.7;
      this.rightArm.fingers.pinky.tip.rotation.x = 1.5;

      // Thumb pointing straight UP!
      this.rightArm.fingers.thumb.root.rotation.x = -0.85;
      this.rightArm.fingers.thumb.root.rotation.z = -0.4;
      this.rightArm.fingers.thumb.tip.rotation.x = 0;
    } else {
      const p = (progress - 0.8) / 0.2;
      this.rightArm.upperArm.rotation.x = THREE.MathUtils.lerp(0.95, 0.1, p);
      this.rightArm.upperArm.rotation.z = THREE.MathUtils.lerp(-0.15, -0.18, p);
      this.rightArm.elbow.rotation.x = THREE.MathUtils.lerp(-1.5, -0.25, p);
      this.rightArm.wrist.rotation.z = THREE.MathUtils.lerp(-Math.PI / 2, 0, p);

      Object.keys(this.rightArm.fingers).forEach((fName) => {
        this.rightArm.fingers[fName].root.rotation.x = 0.22;
        this.rightArm.fingers[fName].tip.rotation.x = 0.25;
      });
    }
  }

  _updateClick(_delta) {
    const t = this.stateTime;
    const progress = Math.min(1.0, t / this.stateDuration);

    // Cheerful hop bounce
    const hop = Math.sin(progress * Math.PI) * 0.25;
    this.floatingRoot.position.y = hop;

    // Both arms cheer outwards slightly
    const armCheer = Math.sin(progress * Math.PI) * 0.45;
    this.leftArm.upperArm.rotation.z = 0.18 + armCheer;
    this.rightArm.upperArm.rotation.z = -0.18 - armCheer;

    // Flashes eye intensity cheerfully
    this.materials.eyeLed.emissiveIntensity = 2.4 + Math.sin(t * 18.0) * 0.8;

    // Head nods cheerfully
    this.joints.neck.rotation.x = Math.sin(t * 12.0) * 0.12;
  }

  dispose() {
    // Traverse and dispose all geometries and materials
    this.group.traverse((obj) => {
      if (obj.isMesh) {
        if (obj.geometry) obj.geometry.dispose();
      }
    });

    Object.values(this.materials).forEach((mat) => {
      if (mat && mat.dispose) mat.dispose();
    });
  }
}

