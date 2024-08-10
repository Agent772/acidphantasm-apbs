
import { inject, injectable } from "tsyringe";
import { WeightedRandomHelper } from "@spt/helpers/WeightedRandomHelper";
import { RaidInformation } from "../Globals/RaidInformation";
import { Logging } from "../Enums/Logging";
import { APBSLogger } from "./APBSLogger";
import { TierInformation } from "../Globals/TierInformation";

@injectable()
export class APBSEquipmentGetter
{

    constructor(
        @inject("RaidInformation") protected raidInformation: RaidInformation,
        @inject("TierInformation") protected tierInformation: TierInformation,
        @inject("WeightedRandomHelper") protected weightedRandomHelper: WeightedRandomHelper,
        @inject("APBSLogger") protected apbsLogger: APBSLogger
    )
    {}

    public getTierJson(tierInfo: number)
    {
        switch (tierInfo)
        {
            case 1:
                return this.tierInformation.tier1
            case 2:
                return this.tierInformation.tier2
            case 3:
                return this.tierInformation.tier3
            case 4:
                return this.tierInformation.tier4
            case 5:
                return this.tierInformation.tier5
            case 6:
                return this.tierInformation.tier6
            case 7:
                return this.tierInformation.tier7
            default:
                this.apbsLogger.log(Logging.WARN, "Bot Level and Tier Information missing, your load order is probably incorrect. Defaulting to Tier1 loadout.");
                return this.tierInformation.tier1
        }
    }

    public getTierModsJson(tierInfo: number)
    {
        switch (tierInfo)
        {
            case 1:
                return this.tierInformation.tier1mods
            case 2:
                return this.tierInformation.tier2mods
            case 3:
                return this.tierInformation.tier3mods
            case 4:
                return this.tierInformation.tier4mods
            case 5:
                return this.tierInformation.tier5mods
            case 6:
                return this.tierInformation.tier6mods
            case 7:
                return this.tierInformation.tier7mods
            default:
                this.apbsLogger.log(Logging.WARN, "Bot Level and Tier Information missing, your load order is probably incorrect. Defaulting to Tier1 mods.");
                return this.tierInformation.tier1mods
        }
    }

    public getTierChancesJson(tierInfo: number)
    {
        switch (tierInfo)
        {
            case 1:
                return this.tierInformation.tier1chances
            case 2:
                return this.tierInformation.tier2chances
            case 3:
                return this.tierInformation.tier3chances
            case 4:
                return this.tierInformation.tier4chances
            case 5:
                return this.tierInformation.tier5chances
            case 6:
                return this.tierInformation.tier6chances
            case 7:
                return this.tierInformation.tier7chances
            default:
                this.apbsLogger.log(Logging.WARN, "Bot Level and Tier Information missing, your load order is probably incorrect. Defaulting to Tier1 chances.");
                return this.tierInformation.tier1chances
        }
    }

    public getTierAmmoJson(tierInfo: number)
    {
        switch (tierInfo)
        {
            case 1:
                return this.tierInformation.tier1ammo
            case 2:
                return this.tierInformation.tier2ammo
            case 3:
                return this.tierInformation.tier3ammo
            case 4:
                return this.tierInformation.tier4ammo
            case 5:
                return this.tierInformation.tier5ammo
            case 6:
                return this.tierInformation.tier6ammo
            case 7:
                return this.tierInformation.tier7ammo
            default:
                this.apbsLogger.log(Logging.WARN, "Bot Level and Tier Information missing, your load order is probably incorrect. Defaulting to Tier1 ammo.");
                return this.tierInformation.tier1ammo
        }
    }

    public getModsByBotRole(botRole: string, tierInfo: number): any
    {
        const tierJson = this.getTierModsJson(tierInfo)
        switch (botRole)
        {
            case "marksman":
            case "cursedassault":
            case "assault":
                return this.tierInformation.tier1mods;
            default:
                return tierJson;
        }
    }

    public getEquipmentByBotRole(botRole: string, tierInfo: number, slot: string, range?: string): Record<string, number>
    {
        const tierJson = this.getTierJson(tierInfo)
        switch (botRole)
        {
            case "pmcusec":
                return (range == undefined) ? tierJson.pmcUSEC.equipment[slot] : tierJson.pmcUSEC.equipment[slot][range];
            case "pmcbear":
                return (range == undefined) ? tierJson.pmcBEAR.equipment[slot] : tierJson.pmcBEAR.equipment[slot][range];
            case "marksman":
                return (range == undefined) ? tierJson.scav.equipment[slot] : tierJson.scav.equipment[slot].LongRange;
            case "cursedassault":
            case "assault":
                return (range == undefined) ? tierJson.scav.equipment[slot] : tierJson.scav.equipment[slot].ShortRange;
            case "bossboar":
                return (range == undefined) ? tierJson.bossboar.equipment[slot] : tierJson.bossboar.equipment[slot][range];
            case "bossboarsniper":
                return (range == undefined) ? tierJson.bossboarsniper.equipment[slot] : tierJson.bossboarsniper.equipment[slot][range];
            case "bossbully":
                return (range == undefined) ? tierJson.bossbully.equipment[slot] : tierJson.bossbully.equipment[slot][range];
            case "bossgluhar":
                return (range == undefined) ? tierJson.bossgluhar.equipment[slot] : tierJson.bossgluhar.equipment[slot][range];
            case "bosskilla":
                return (range == undefined) ? tierJson.bosskilla.equipment[slot] : tierJson.bosskilla.equipment[slot][range];
            case "bosskojaniy":
                return (range == undefined) ? tierJson.bosskojaniy.equipment[slot] : tierJson.bosskojaniy.equipment[slot][range];
            case "bosskolontay":
                return (range == undefined) ? tierJson.bosskolontay.equipment[slot] : tierJson.bosskolontay.equipment[slot][range];
            case "bosssanitar":
                return (range == undefined) ? tierJson.bosssanitar.equipment[slot] : tierJson.bosssanitar.equipment[slot][range];
            case "bosstagilla":
                return (range == undefined) ? tierJson.bosstagilla.equipment[slot] : tierJson.bosstagilla.equipment[slot][range];
            case "bossknight":
                return (range == undefined) ? tierJson.bossknight.equipment[slot] : tierJson.bossknight.equipment[slot][range];
            case "followerbigpipe":
                return (range == undefined) ? tierJson.followerbigpipe.equipment[slot] : tierJson.followerbigpipe.equipment[slot][range];
            case "followerbirdeye":
                return (range == undefined) ? tierJson.followerbirdeye.equipment[slot] : tierJson.followerbirdeye.equipment[slot][range];
            case "sectantpriest":
                return (range == undefined) ? tierJson.sectantpriest.equipment[slot] : tierJson.sectantpriest.equipment[slot][range];
            case "sectantwarrior":
                return (range == undefined) ? tierJson.sectantwarrior.equipment[slot] : tierJson.sectantwarrior.equipment[slot][range];
            case "exusec":
            case "arenafighterevent":
            case "arenafighter":
                return (range == undefined) ? tierJson.exUSEC.equipment[slot] : tierJson.exUSEC.equipment[slot][range];
            case "pmcbot":
                return (range == undefined) ? tierJson.pmcbot.equipment[slot] : tierJson.pmcbot.equipment[slot][range];
            default:
                return (range == undefined) ? tierJson.default.equipment[slot] : tierJson.default.equipment[slot][range];
        }
    }

    public getSpawnChancesByBotRole(botRole: string, tierInfo: number): any
    {
        const tierJson = this.getTierChancesJson(tierInfo)
        switch (botRole)
        {
            case "pmcbear":
                return tierJson.pmcBEAR.chances;
            case "pmcusec":
                return tierJson.pmcUSEC.chances;
            case "marksman":
            case "cursedassault":
            case "assault":
                return tierJson.scav.chances;
            case "bossboar":
                return tierJson.bossboar.chances;
            case "bossboarsniper":
                return tierJson.bossboarsniper.chances;
            case "bossbully":
                return tierJson.bossbully.chances;
            case "bossgluhar":
                return tierJson.bossgluhar.chances;
            case "bosskilla":
                return tierJson.bosskilla.chances;
            case "bossknight":
                return tierJson.bossknight.chances;
            case "bosskojaniy":
                return tierJson.bosskojaniy.chances;
            case "bosskolontay":
                return tierJson.bosskolontay.chances;
            case "bosssanitar":
                return tierJson.bosssanitar.chances;
            case "bosstagilla":
                return tierJson.bosstagilla.chances;
            case "bosszryachiy":
                return tierJson.bosszryachiy.chances;
            case "followerbigpipe":
                return tierJson.followerbigpipe.chances;
            case "followerbirdeye":
                return tierJson.followerbirdeye.chances;
            case "sectantpriest":
                return tierJson.sectantpriest.chances;
            case "sectantwarrior":
                return tierJson.sectantwarrior.chances;
            case "exusec":
                return tierJson.exusec.chances;
            case "pmcbot":
                return tierJson.pmcbot.chances;
            default:
                return tierJson.default.chances;
        }
    }

    public getAmmoByBotRole(botRole: string, tierInfo: number): Record<string, Record<string, number>>
    {
        const tierJson = this.getTierAmmoJson(tierInfo)
        switch (botRole)
        {
            case "marksman":
            case "cursedassault":
            case "assault":
                return tierJson.scavAmmo;
            case "pmcusec":
            case "pmcbear":
                return tierJson.pmcAmmo;
            default:
                return tierJson.bossAmmo;
        }
    }
}