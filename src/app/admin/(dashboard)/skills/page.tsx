import { getSkills } from "@/app/actions/skills";
import SkillsManager from "@/components/admin/SkillsManager";
import styles from "./Skills.module.css";

export default async function AdminSkillsPage() {
    const allSkills = await getSkills();

    return (
        <div className={styles.container}>
            <SkillsManager initialSkills={allSkills as any} />
        </div>
    );
}
