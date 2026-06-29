SKILL_MAP = {
    "python": "Python",
    "cpp": "C++",
    "c++": "C++",
    "machine learning": "Machine Learning"
}

def normalize_skills(skills):
    result = []

    for skill in skills:
        skill = skill.strip().lower()

        if skill in SKILL_MAP:
            result.append(SKILL_MAP[skill])
        else:
            result.append(skill.title())

    return list(set(result))