<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        $user = new User();
        $user->setEmail('test@test.com');
        $user->setPassword($this->passwordEncoder->encodePassword(
            $user,
            'password'
        ));
        $manager->persist($user);

        $user = new User();
        $user->setEmail('admin@test.com');
        $user->setRoles(['ROLE_ADMIN']);
        $user->setPassword($this->passwordEncoder->encodePassword(
            $user,
            'admin_password'
        ));
        $manager->persist($user);

        $manager->flush();
    }
}
