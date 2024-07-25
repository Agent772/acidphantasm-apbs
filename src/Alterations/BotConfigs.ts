/* eslint-disable @typescript-eslint/naming-convention */
import { injectable, inject } from "tsyringe";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { IBotConfig } from "@spt/models/spt/config/IBotConfig";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { TierInformation } from "../Globals/TierInformation";


@injectable()
export class BotConfigs
{
    protected botConfig: IBotConfig;
    protected pmcConfig: IPmcConfig;
    
    constructor(
        @inject("IDatabaseTables") protected tables: IDatabaseTables,
        @inject("ConfigServer") protected configServer: ConfigServer,
        @inject("TierInformation") protected tierInformation: TierInformation
    )
    {
        this.botConfig = this.configServer.getConfig(ConfigTypes.BOT);
    }

    public initialize(): void
    {
        this.configureBotExperienceLevels();
        this.configurePlateWeightings();
        this.clearNoLongerNeededBotDetails();
        this.configureAssaultWeaponDurability();
        this.removeNvgChanceFromBosses();
        this.setWeaponModLimits();
        this.setNewRandomization();
    }

    private configureBotExperienceLevels(): void
    {
        const botTypeTable = this.tables.bots.types;

        for (const botType in botTypeTable)
        {
            botTypeTable[botType].experience.level.min = 1;
            botTypeTable[botType].experience.level.max = 78;
        }
    }

    private configurePlateWeightings(): void
    {
        const botConfigEquipment = this.botConfig.equipment
        for (const botType in botConfigEquipment)
        {
            botConfigEquipment[botType].filterPlatesByLevel = true;
            botConfigEquipment[botType].armorPlateWeighting = this.tierInformation.armorPlateWeights
        }
    }

    private clearNoLongerNeededBotDetails(): void
    {
        const botConfigEquipment = this.botConfig.equipment
        for (const botType in botConfigEquipment)
        {
            botConfigEquipment[botType].randomisation = [];
            botConfigEquipment[botType].weightingAdjustmentsByBotLevel = [];
        }
    }

    private configureAssaultWeaponDurability(): void
    {
        // Do this better in the future
        const botConfigDurability = this.botConfig.durability

        botConfigDurability.assault.weapon.lowestMax = 60
        botConfigDurability.assault.weapon.highestMax = 90
        botConfigDurability.assault.weapon.maxDelta = 25
        botConfigDurability.assault.weapon.minDelta = 0
        botConfigDurability.assault.weapon.minLimitPercent = 15

        botConfigDurability.marksman.weapon.lowestMax = 60
        botConfigDurability.marksman.weapon.highestMax = 90
        botConfigDurability.marksman.weapon.maxDelta = 25
        botConfigDurability.marksman.weapon.minDelta = 0
        botConfigDurability.marksman.weapon.minLimitPercent = 15
    }

    private removeNvgChanceFromBosses(): void
    {
        const botConfigEquipment = this.botConfig.equipment

        for (const botType in botConfigEquipment)
        {
            if (botType.includes("boss"))
            {
                botConfigEquipment[botType].nvgIsActiveChanceDayPercent = 0;
                botConfigEquipment[botType].nvgIsActiveChanceNightPercent = 0;
                botConfigEquipment[botType].faceShieldIsActiveChancePercent = 100;
            }
        }
    }

    private setWeaponModLimits(): void
    {
        const botConfigEquipment = this.botConfig.equipment
        for (const botType in botConfigEquipment)
        {
            botConfigEquipment[botType].forceStock = true;
            if (typeof botConfigEquipment[botType].weaponModLimits == "undefined")
            {
                botConfigEquipment[botType].weaponModLimits = {                
                    "scopeLimit": 2,
                    "lightLaserLimit": 2
                };
            }
        }
    }

    private setNewRandomization(): void
    {
        const botConfigEquipment = this.botConfig.equipment
        for (const botType in botConfigEquipment)
        {
            if (typeof this.botConfig.lootItemResourceRandomization[botType] == "undefined")
            {
                this.botConfig.lootItemResourceRandomization[botType] = {"food": { "chanceMaxResourcePercent": 50, "resourcePercent": 65 }, "meds": { "chanceMaxResourcePercent": 50, "resourcePercent": 65 } }
            }
            this.botConfig.itemSpawnLimits[botType]["60098ad7c2240c0fe85c570a"] = 2
            this.botConfig.itemSpawnLimits[botType]["590c678286f77426c9660122"] = 2
            this.botConfig.itemSpawnLimits[botType]["5e831507ea0a7c419c2f9bd9"] = 1
            this.botConfig.itemSpawnLimits[botType]["590c661e86f7741e566b646a"] = 1
            this.botConfig.itemSpawnLimits[botType]["544fb45d4bdc2dee738b4568"] = 1
            this.botConfig.itemSpawnLimits[botType]["5e8488fa988a8701445df1e4"] = 1
            this.botConfig.itemSpawnLimits[botType]["544fb37f4bdc2dee738b4567"] = 1
            this.botConfig.itemSpawnLimits[botType]["5448e8d04bdc2ddf718b4569"] = 1
            this.botConfig.itemSpawnLimits[botType]["5448e8d64bdc2dce718b4568"] = 1
        }

        botConfigEquipment.pmc.randomisation = this.tierInformation.lootRandomization

    }
}