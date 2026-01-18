from enum import Enum


class MemeSource(str, Enum):
    REDDIT = "Reddit"
    TWITTER = "Twitter"
    DEVS = "Devs"
    UNKNOWN = "Unknown"
